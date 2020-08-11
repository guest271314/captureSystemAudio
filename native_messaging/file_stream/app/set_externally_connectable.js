(async(set_externally_connectable = ["https://example.com/*"], unset_externally_connectable = true) => {
  const dir = await self.showDirectoryPicker();
  const status = await dir.requestPermission({writable: true});
  const fileHandle = await dir.getFileHandle("manifest.json", {create: false});
  const file = await fileHandle.getFile();
  const manifest_text = await file.text();
  const match_extension_id = /\/\/ Extension ID: \w{32}/;
  const [extension_id] = manifest_text.match(match_extension_id);
  let text = manifest_text.replace(match_extension_id, `"_": 0,`);
  const manifest_json = JSON.parse(text);
  manifest_json.externally_connectable.matches = unset_externally_connectable ? set_externally_connectable :
    [...manifest_json.externally_connectable.matches, ...set_externally_connectable];
  const writer = await fileHandle.createWritable({keepExistingData:false});
  await writer.write(JSON.stringify(manifest_json, null, 2).replace(/"_": 0,/, extension_id)); 
  return await writer.close();
})([`${location.origin}/*`]);
