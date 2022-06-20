/*
 * Compile with:
 * gcc -fvisibility=hidden -shared -I /usr/local/include/quickjs/ -g -ggdb -O -Wall popenAndRead.c -o popen.so -lquickjs
 */
#include "quickjs.h"
#include "cutils.h"
#include <stdio.h>
#include <errno.h>
#include <string.h>

/*
* JS signature:
*
*   popenAndRead(command, callback[, bufSize])
*
* reads as long as the pipe is open
*/
static JSValue
module_popen_and_read(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst argv[]) {
  const char* command;
  FILE* pipe;
	uint32_t bufSize = 441 * 4;
  uint8_t buffer[bufSize];
  /* Check for correct callback function */
  if(!JS_IsFunction(ctx, argv[1]))
    return JS_ThrowTypeError(ctx, "argument 2 must be a function");

  /* Convert the command to an UTF-8 string */
  command = JS_ToCString(ctx, argv[0]);
  
	/* Optional buffer size given? Convert to unsigned integer */
	if(argc > 2 && JS_IsNumber(argv[2]))
		JS_ToUint32(ctx, &bufSize, argv[2]);

  /* Try to create the pipe, throw on error */
  if(!(pipe = popen(command, "r"))) {
    /* Free up the command string) */
    JS_FreeCString(ctx, command);
    return JS_ThrowInternalError(ctx, "failed opening the pipe: %s", strerror(errno));
  }

  while(!feof(pipe)) {
    size_t count;
    JSValue retval, params[1];

    /* bytewise read into buffer */
    count = fread(buffer, 1, bufSize, pipe);

    /* if there was an error during read, throw an exception */
    if(ferror(pipe)) {
      fclose(pipe);
      /* Free up the command string) */
      JS_FreeCString(ctx, command);
      return JS_ThrowInternalError(ctx, "failed reading the pipe: %s", strerror(errno));
    }

    /* create new ArrayBuffer from that */
    params[0] = JS_NewArrayBufferCopy(ctx, buffer, count);

    /* call the JS callback handler with the ArrayBuffer as parameter and an undefined 'this' value */
    retval = JS_Call(ctx, argv[1], JS_UNDEFINED, 1, params);

    /* return value is 'live', free it up */
    JS_FreeValue(ctx, retval);

    /* Freeing retval does not stop memory continuously increasing */
    JS_FreeValue(ctx, params[0]);
  }

  /* Close the pipe */
  fclose(pipe);

  /* Free up the command string) */
  JS_FreeCString(ctx, command);

  return JS_UNDEFINED;
}

/* Declare the JSCFunction requiring 2 arguments */
static const JSCFunctionListEntry module_funcs[] = {
  JS_CFUNC_DEF("popenAndRead", 2, module_popen_and_read),
};


/* Export the function on module initialization */
static int
module_init(JSContext* ctx, JSModuleDef* m) {
  /* Sets the export list to the function declarations above */
  JS_SetModuleExportList(ctx, m, module_funcs, countof(module_funcs));
  return 0;
}

/*
 * shared-object entry point. when loaded by QuickJS will get executed
 * (make the function the only exported name of the shared-object)
 */
__attribute__((visibility("default"))) JSModuleDef*
js_init_module(JSContext* ctx, const char* module_name) {
  JSModuleDef* m;
  /* creates a new module, named according to the 'from' string given in the import directive
     and with the initialization function above. */
  m = JS_NewCModule(ctx, module_name, module_init);
  if(!m)
    return NULL;
  /* adds the exports */
  JS_AddModuleExportList(ctx, m, module_funcs, countof(module_funcs));
  return m;
}
