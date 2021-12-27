//https://github.com/cstoquer/audio-encoder
!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.audioEncoder = t())
    : (e.audioEncoder = t());
})(window, function () {
  return (function (e) {
    var t = {};
    function a(n) {
      if (t[n]) return t[n].exports;
      var s = (t[n] = {
        i: n,
        l: !1,
        exports: {},
      });
      return e[n].call(s.exports, s, s.exports, a), (s.l = !0), s.exports;
    }
    return (
      (a.m = e),
      (a.c = t),
      (a.d = function (e, t, n) {
        a.o(e, t) ||
          Object.defineProperty(e, t, {
            enumerable: !0,
            get: n,
          });
      }),
      (a.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, {
            value: 'Module',
          }),
          Object.defineProperty(e, '__esModule', {
            value: !0,
          });
      }),
      (a.t = function (e, t) {
        if ((1 & t && (e = a(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (a.r(n),
          Object.defineProperty(n, 'default', {
            enumerable: !0,
            value: e,
          }),
          2 & t && 'string' != typeof e)
        )
          for (var s in e)
            a.d(
              n,
              s,
              function (t) {
                return e[t];
              }.bind(null, s)
            );
        return n;
      }),
      (a.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return a.d(t, 'a', t), t;
      }),
      (a.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (a.p = ''),
      a((a.s = 14))
    );
  })([
    function (e, t) {
      function a(e) {
        return new Int16Array(e);
      }
      function n(e) {
        return new Int32Array(e);
      }
      function s(e) {
        return new Float32Array(e);
      }
      var r = {
          fill: function (e, t, a, n) {
            if (2 == arguments.length)
              for (var s = 0; s < e.length; s++) e[s] = arguments[1];
            else for (s = t; s < a; s++) e[s] = n;
          },
        },
        _ = {
          arraycopy: function (e, t, a, n, s) {
            for (var r = t + s; t < r; ) a[n++] = e[t++];
          },
        },
        i = {};
      function o(e) {
        this.ordinal = e;
      }
      (i.SQRT2 = 1.4142135623730951),
        (i.FAST_LOG10 = function (e) {
          return Math.log10(e);
        }),
        (i.FAST_LOG10_X = function (e, t) {
          return Math.log10(e) * t;
        }),
        (o.short_block_allowed = new o(0)),
        (o.short_block_coupled = new o(1)),
        (o.short_block_dispensed = new o(2)),
        (o.short_block_forced = new o(3));
      var l = {};
      function f(e) {
        this.ordinal = e;
      }
      (l.MAX_VALUE = 34028235e31),
        (f.vbr_off = new f(0)),
        (f.vbr_mt = new f(1)),
        (f.vbr_rh = new f(2)),
        (f.vbr_abr = new f(3)),
        (f.vbr_mtrh = new f(4)),
        (f.vbr_default = f.vbr_mtrh);
      e.exports = {
        System: _,
        VbrMode: f,
        Float: l,
        ShortBlock: o,
        Util: i,
        Arrays: r,
        new_array_n: function e(t) {
          if (1 == t.length) return new Array(t[0]);
          var a = t[0];
          t = t.slice(1);
          for (var n = [], s = 0; s < a; s++) n.push(e(t));
          return n;
        },
        new_byte: function (e) {
          return new Int8Array(e);
        },
        new_double: function (e) {
          return new Float64Array(e);
        },
        new_float: s,
        new_float_n: function e(t) {
          if (1 == t.length) return s(t[0]);
          var a = t[0];
          t = t.slice(1);
          for (var n = [], r = 0; r < a; r++) n.push(e(t));
          return n;
        },
        new_int: n,
        new_int_n: function e(t) {
          if (1 == t.length) return n(t[0]);
          var a = t[0];
          t = t.slice(1);
          for (var s = [], r = 0; r < a; r++) s.push(e(t));
          return s;
        },
        new_short: a,
        new_short_n: function e(t) {
          if (1 == t.length) return a(t[0]);
          var n = t[0];
          t = t.slice(1);
          for (var s = [], r = 0; r < n; r++) s.push(e(t));
          return s;
        },
        assert: function (e) {},
      };
    },
    function (e, t, a) {
      var n = a(0),
        s = n.System,
        r = n.VbrMode,
        _ = (n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n),
        i = (n.new_byte, n.new_double, n.new_float),
        o = n.new_float_n,
        l = n.new_int,
        f = (n.new_int_n, n.assert);
      function c() {
        var e = a(21),
          t = a(22),
          n = c.FFTOFFSET,
          u = c.MPG_MD_MS_LR,
          h = null;
        this.psy = null;
        var b = null,
          m = null,
          p = null;
        this.setModules = function (e, t, a, n) {
          (h = e), (this.psy = t), (b = t), (m = n), (p = a);
        };
        var d = new e();
        this.lame_encode_mp3_frame = function (e, a, v, g, S, M) {
          var w,
            A = _([2, 2]);
          (A[0][0] = new t()),
            (A[0][1] = new t()),
            (A[1][0] = new t()),
            (A[1][1] = new t());
          var R,
            B = _([2, 2]);
          (B[0][0] = new t()),
            (B[0][1] = new t()),
            (B[1][0] = new t()),
            (B[1][1] = new t());
          var y,
            E,
            T,
            x = [null, null],
            k = e.internal_flags,
            P = o([2, 4]),
            I = [0.5, 0.5],
            L = [
              [0, 0],
              [0, 0],
            ],
            V = [
              [0, 0],
              [0, 0],
            ];
          if (
            ((x[0] = a),
            (x[1] = v),
            0 == k.lame_encode_frame_init &&
              (function (e, t) {
                var a,
                  n,
                  s = e.internal_flags;
                if (0 == s.lame_encode_frame_init) {
                  var r,
                    _,
                    o = i(2014),
                    l = i(2014);
                  for (
                    s.lame_encode_frame_init = 1, r = 0, _ = 0;
                    r < 286 + 576 * (1 + s.mode_gr);
                    ++r
                  )
                    r < 576 * s.mode_gr
                      ? ((o[r] = 0), 2 == s.channels_out && (l[r] = 0))
                      : ((o[r] = t[0][_]),
                        2 == s.channels_out && (l[r] = t[1][_]),
                        ++_);
                  for (n = 0; n < s.mode_gr; n++)
                    for (a = 0; a < s.channels_out; a++)
                      s.l3_side.tt[n][a].block_type = c.SHORT_TYPE;
                  d.mdct_sub48(s, o, l),
                    f(576 >= c.FFTOFFSET),
                    f(s.mf_size >= c.BLKSIZE + e.framesize - c.FFTOFFSET),
                    f(s.mf_size >= 512 + e.framesize - 32);
                }
              })(e, x),
            (k.padding = 0),
            (k.slot_lag -= k.frac_SpF) < 0 &&
              ((k.slot_lag += e.out_samplerate), (k.padding = 1)),
            0 != k.psymodel)
          ) {
            var H = [null, null],
              O = 0,
              N = l(2);
            for (T = 0; T < k.mode_gr; T++) {
              for (E = 0; E < k.channels_out; E++)
                (H[E] = x[E]), (O = 576 + 576 * T - c.FFTOFFSET);
              if (
                0 !=
                (e.VBR == r.vbr_mtrh || e.VBR == r.vbr_mt
                  ? b.L3psycho_anal_vbr(e, H, O, T, A, B, L[T], V[T], P[T], N)
                  : b.L3psycho_anal_ns(e, H, O, T, A, B, L[T], V[T], P[T], N))
              )
                return -4;
              for (
                e.mode == MPEGMode.JOINT_STEREO &&
                  ((I[T] = P[T][2] + P[T][3]),
                  I[T] > 0 && (I[T] = P[T][3] / I[T])),
                  E = 0;
                E < k.channels_out;
                E++
              ) {
                var X = k.l3_side.tt[T][E];
                (X.block_type = N[E]), (X.mixed_block_flag = 0);
              }
            }
          } else
            for (T = 0; T < k.mode_gr; T++)
              for (E = 0; E < k.channels_out; E++)
                (k.l3_side.tt[T][E].block_type = c.NORM_TYPE),
                  (k.l3_side.tt[T][E].mixed_block_flag = 0),
                  (V[T][E] = L[T][E] = 700);
          if (
            ((function (e) {
              var t, a;
              if (0 != e.ATH.useAdjust)
                if (
                  ((a = e.loudness_sq[0][0]),
                  (t = e.loudness_sq[1][0]),
                  2 == e.channels_out
                    ? ((a += e.loudness_sq[0][1]), (t += e.loudness_sq[1][1]))
                    : ((a += a), (t += t)),
                  2 == e.mode_gr && (a = Math.max(a, t)),
                  (a *= 0.5),
                  (a *= e.ATH.aaSensitivityP) > 0.03125)
                )
                  e.ATH.adjust >= 1
                    ? (e.ATH.adjust = 1)
                    : e.ATH.adjust < e.ATH.adjustLimit &&
                      (e.ATH.adjust = e.ATH.adjustLimit),
                    (e.ATH.adjustLimit = 1);
                else {
                  var n = 31.98 * a + 625e-6;
                  e.ATH.adjust >= n
                    ? ((e.ATH.adjust *= 0.075 * n + 0.925),
                      e.ATH.adjust < n && (e.ATH.adjust = n))
                    : e.ATH.adjustLimit >= n
                    ? (e.ATH.adjust = n)
                    : e.ATH.adjust < e.ATH.adjustLimit &&
                      (e.ATH.adjust = e.ATH.adjustLimit),
                    (e.ATH.adjustLimit = n);
                }
              else e.ATH.adjust = 1;
            })(k),
            d.mdct_sub48(k, x[0], x[1]),
            (k.mode_ext = c.MPG_MD_LR_LR),
            e.force_ms)
          )
            k.mode_ext = c.MPG_MD_MS_LR;
          else if (e.mode == MPEGMode.JOINT_STEREO) {
            var D = 0,
              F = 0;
            for (T = 0; T < k.mode_gr; T++)
              for (E = 0; E < k.channels_out; E++)
                (D += V[T][E]), (F += L[T][E]);
            if (D <= 1 * F) {
              var Y = k.l3_side.tt[0],
                q = k.l3_side.tt[k.mode_gr - 1];
              Y[0].block_type == Y[1].block_type &&
                q[0].block_type == q[1].block_type &&
                (k.mode_ext = c.MPG_MD_MS_LR);
            }
          }
          if (
            (k.mode_ext == u ? ((R = B), (y = V)) : ((R = A), (y = L)),
            e.analysis && null != k.pinfo)
          )
            for (T = 0; T < k.mode_gr; T++)
              for (E = 0; E < k.channels_out; E++)
                (k.pinfo.ms_ratio[T] = k.ms_ratio[T]),
                  (k.pinfo.ms_ener_ratio[T] = I[T]),
                  (k.pinfo.blocktype[T][E] = k.l3_side.tt[T][E].block_type),
                  (k.pinfo.pe[T][E] = y[T][E]),
                  s.arraycopy(
                    k.l3_side.tt[T][E].xr,
                    0,
                    k.pinfo.xr[T][E],
                    0,
                    576
                  ),
                  k.mode_ext == u &&
                    ((k.pinfo.ers[T][E] = k.pinfo.ers[T][E + 2]),
                    s.arraycopy(
                      k.pinfo.energy[T][E + 2],
                      0,
                      k.pinfo.energy[T][E],
                      0,
                      k.pinfo.energy[T][E].length
                    ));
          if (e.VBR == r.vbr_off || e.VBR == r.vbr_abr) {
            var C, j;
            for (C = 0; C < 18; C++)
              k.nsPsy.pefirbuf[C] = k.nsPsy.pefirbuf[C + 1];
            for (j = 0, T = 0; T < k.mode_gr; T++)
              for (E = 0; E < k.channels_out; E++) j += y[T][E];
            for (
              k.nsPsy.pefirbuf[18] = j, j = k.nsPsy.pefirbuf[9], C = 0;
              C < 9;
              C++
            )
              j +=
                (k.nsPsy.pefirbuf[C] + k.nsPsy.pefirbuf[18 - C]) * c.fircoef[C];
            for (
              j = (3350 * k.mode_gr * k.channels_out) / j, T = 0;
              T < k.mode_gr;
              T++
            )
              for (E = 0; E < k.channels_out; E++) y[T][E] *= j;
          }
          if (
            (k.iteration_loop.iteration_loop(e, y, I, R),
            h.format_bitstream(e),
            (w = h.copy_buffer(k, g, S, M, 1)),
            e.bWriteVbrTag && m.addVbrFrame(e),
            e.analysis && null != k.pinfo)
          ) {
            for (E = 0; E < k.channels_out; E++) {
              var G;
              for (G = 0; G < n; G++)
                k.pinfo.pcmdata[E][G] = k.pinfo.pcmdata[E][G + e.framesize];
              for (G = n; G < 1600; G++) k.pinfo.pcmdata[E][G] = x[E][G - n];
            }
            p.set_frame_pinfo(e, R);
          }
          return (
            (function (e) {
              var t, a;
              for (
                f(0 <= e.bitrate_index && e.bitrate_index < 16),
                  f(0 <= e.mode_ext && e.mode_ext < 4),
                  e.bitrate_stereoMode_Hist[e.bitrate_index][4]++,
                  e.bitrate_stereoMode_Hist[15][4]++,
                  2 == e.channels_out &&
                    (e.bitrate_stereoMode_Hist[e.bitrate_index][e.mode_ext]++,
                    e.bitrate_stereoMode_Hist[15][e.mode_ext]++),
                  t = 0;
                t < e.mode_gr;
                ++t
              )
                for (a = 0; a < e.channels_out; ++a) {
                  var n = 0 | e.l3_side.tt[t][a].block_type;
                  0 != e.l3_side.tt[t][a].mixed_block_flag && (n = 4),
                    e.bitrate_blockType_Hist[e.bitrate_index][n]++,
                    e.bitrate_blockType_Hist[e.bitrate_index][5]++,
                    e.bitrate_blockType_Hist[15][n]++,
                    e.bitrate_blockType_Hist[15][5]++;
                }
            })(k),
            w
          );
        };
      }
      (c.ENCDELAY = 576),
        (c.POSTDELAY = 1152),
        (c.MDCTDELAY = 48),
        (c.FFTOFFSET = 224 + c.MDCTDELAY),
        (c.DECDELAY = 528),
        (c.SBLIMIT = 32),
        (c.CBANDS = 64),
        (c.SBPSY_l = 21),
        (c.SBPSY_s = 12),
        (c.SBMAX_l = 22),
        (c.SBMAX_s = 13),
        (c.PSFB21 = 6),
        (c.PSFB12 = 6),
        (c.BLKSIZE = 1024),
        (c.HBLKSIZE = c.BLKSIZE / 2 + 1),
        (c.BLKSIZE_s = 256),
        (c.HBLKSIZE_s = c.BLKSIZE_s / 2 + 1),
        (c.NORM_TYPE = 0),
        (c.START_TYPE = 1),
        (c.SHORT_TYPE = 2),
        (c.STOP_TYPE = 3),
        (c.MPG_MD_LR_LR = 0),
        (c.MPG_MD_LR_I = 1),
        (c.MPG_MD_MS_LR = 2),
        (c.MPG_MD_MS_I = 3),
        (c.fircoef = [
          -0.1039435,
          -0.1892065,
          5 * -0.0432472,
          -0.155915,
          3898045e-23,
          0.0467745 * 5,
          0.50455,
          0.756825,
          0.187098 * 5,
        ]),
        (e.exports = c);
    },
    function (e, t, a) {
      var n = a(0),
        s =
          (n.System,
          n.VbrMode,
          n.Float,
          n.ShortBlock,
          n.Util,
          n.Arrays,
          n.new_array_n,
          n.new_byte),
        r = n.new_double,
        _ = n.new_float,
        i = n.new_float_n,
        o = n.new_int,
        l = n.new_int_n,
        f = (n.assert, a(24)),
        c = a(8),
        u = a(25),
        h = a(26),
        b = a(6),
        m = a(1),
        p = a(3);
      function d() {
        function e() {
          (this.write_timing = 0), (this.ptr = 0), (this.buf = s(40));
        }
        (this.Class_ID = 0),
          (this.lame_encode_frame_init = 0),
          (this.iteration_init_init = 0),
          (this.fill_buffer_resample_init = 0),
          (this.mfbuf = i([2, d.MFSIZE])),
          (this.mode_gr = 0),
          (this.channels_in = 0),
          (this.channels_out = 0),
          (this.resample_ratio = 0),
          (this.mf_samples_to_encode = 0),
          (this.mf_size = 0),
          (this.VBR_min_bitrate = 0),
          (this.VBR_max_bitrate = 0),
          (this.bitrate_index = 0),
          (this.samplerate_index = 0),
          (this.mode_ext = 0),
          (this.lowpass1 = 0),
          (this.lowpass2 = 0),
          (this.highpass1 = 0),
          (this.highpass2 = 0),
          (this.noise_shaping = 0),
          (this.noise_shaping_amp = 0),
          (this.substep_shaping = 0),
          (this.psymodel = 0),
          (this.noise_shaping_stop = 0),
          (this.subblock_gain = 0),
          (this.use_best_huffman = 0),
          (this.full_outer_loop = 0),
          (this.l3_side = new f()),
          (this.ms_ratio = _(2)),
          (this.padding = 0),
          (this.frac_SpF = 0),
          (this.slot_lag = 0),
          (this.tag_spec = null),
          (this.nMusicCRC = 0),
          (this.OldValue = o(2)),
          (this.CurrentStep = o(2)),
          (this.masking_lower = 0),
          (this.bv_scf = o(576)),
          (this.pseudohalf = o(p.SFBMAX)),
          (this.sfb21_extra = !1),
          (this.inbuf_old = new Array(2)),
          (this.blackfilt = new Array(2 * d.BPC + 1)),
          (this.itime = r(2)),
          (this.sideinfo_len = 0),
          (this.sb_sample = i([2, 2, 18, m.SBLIMIT])),
          (this.amp_filter = _(32)),
          (this.header = new Array(d.MAX_HEADER_BUF)),
          (this.h_ptr = 0),
          (this.w_ptr = 0),
          (this.ancillary_flag = 0),
          (this.ResvSize = 0),
          (this.ResvMax = 0),
          (this.scalefac_band = new c()),
          (this.minval_l = _(m.CBANDS)),
          (this.minval_s = _(m.CBANDS)),
          (this.nb_1 = i([4, m.CBANDS])),
          (this.nb_2 = i([4, m.CBANDS])),
          (this.nb_s1 = i([4, m.CBANDS])),
          (this.nb_s2 = i([4, m.CBANDS])),
          (this.s3_ss = null),
          (this.s3_ll = null),
          (this.decay = 0),
          (this.thm = new Array(4)),
          (this.en = new Array(4)),
          (this.tot_ener = _(4)),
          (this.loudness_sq = i([2, 2])),
          (this.loudness_sq_save = _(2)),
          (this.mld_l = _(m.SBMAX_l)),
          (this.mld_s = _(m.SBMAX_s)),
          (this.bm_l = o(m.SBMAX_l)),
          (this.bo_l = o(m.SBMAX_l)),
          (this.bm_s = o(m.SBMAX_s)),
          (this.bo_s = o(m.SBMAX_s)),
          (this.npart_l = 0),
          (this.npart_s = 0),
          (this.s3ind = l([m.CBANDS, 2])),
          (this.s3ind_s = l([m.CBANDS, 2])),
          (this.numlines_s = o(m.CBANDS)),
          (this.numlines_l = o(m.CBANDS)),
          (this.rnumlines_l = _(m.CBANDS)),
          (this.mld_cb_l = _(m.CBANDS)),
          (this.mld_cb_s = _(m.CBANDS)),
          (this.numlines_s_num1 = 0),
          (this.numlines_l_num1 = 0),
          (this.pe = _(4)),
          (this.ms_ratio_s_old = 0),
          (this.ms_ratio_l_old = 0),
          (this.ms_ener_ratio_old = 0),
          (this.blocktype_old = o(2)),
          (this.nsPsy = new u()),
          (this.VBR_seek_table = new h()),
          (this.ATH = null),
          (this.PSY = null),
          (this.nogap_total = 0),
          (this.nogap_current = 0),
          (this.decode_on_the_fly = !0),
          (this.findReplayGain = !0),
          (this.findPeakSample = !0),
          (this.PeakSample = 0),
          (this.RadioGain = 0),
          (this.AudiophileGain = 0),
          (this.rgdata = null),
          (this.noclipGainChange = 0),
          (this.noclipScale = 0),
          (this.bitrate_stereoMode_Hist = l([16, 5])),
          (this.bitrate_blockType_Hist = l([16, 6])),
          (this.pinfo = null),
          (this.hip = null),
          (this.in_buffer_nsamples = 0),
          (this.in_buffer_0 = null),
          (this.in_buffer_1 = null),
          (this.iteration_loop = null);
        for (var t = 0; t < this.en.length; t++) this.en[t] = new b();
        for (t = 0; t < this.thm.length; t++) this.thm[t] = new b();
        for (t = 0; t < this.header.length; t++) this.header[t] = new e();
      }
      (d.MFSIZE = 3456 + m.ENCDELAY - m.MDCTDELAY),
        (d.MAX_HEADER_BUF = 256),
        (d.MAX_BITS_PER_CHANNEL = 4095),
        (d.MAX_BITS_PER_GRANULE = 7680),
        (d.BPC = 320),
        (e.exports = d);
    },
    function (e, t, a) {
      var n = a(1),
        s = {};
      (s.SFBMAX = 3 * n.SBMAX_s), (e.exports = s);
    },
    function (e, t, a) {
      var n = a(0),
        s =
          (n.System,
          n.VbrMode,
          n.Float,
          n.ShortBlock,
          n.Util,
          n.Arrays,
          n.new_array_n,
          n.new_byte,
          n.new_double,
          n.new_float),
        r = (n.new_float_n, n.new_int),
        _ = (n.new_int_n, n.assert, a(3));
      e.exports = function () {
        (this.xr = s(576)),
          (this.l3_enc = r(576)),
          (this.scalefac = r(_.SFBMAX)),
          (this.xrpow_max = 0),
          (this.part2_3_length = 0),
          (this.big_values = 0),
          (this.count1 = 0),
          (this.global_gain = 0),
          (this.scalefac_compress = 0),
          (this.block_type = 0),
          (this.mixed_block_flag = 0),
          (this.table_select = r(3)),
          (this.subblock_gain = r(4)),
          (this.region0_count = 0),
          (this.region1_count = 0),
          (this.preflag = 0),
          (this.scalefac_scale = 0),
          (this.count1table_select = 0),
          (this.part2_length = 0),
          (this.sfb_lmax = 0),
          (this.sfb_smin = 0),
          (this.psy_lmax = 0),
          (this.sfbmax = 0),
          (this.psymax = 0),
          (this.sfbdivide = 0),
          (this.width = r(_.SFBMAX)),
          (this.window = r(_.SFBMAX)),
          (this.count1bits = 0),
          (this.sfb_partition_table = null),
          (this.slen = r(4)),
          (this.max_nonzero_coeff = 0);
        var e = this;
        function t(e) {
          return new Int32Array(e);
        }
        this.assign = function (a) {
          var n;
          (e.xr = ((n = a.xr), new Float32Array(n))),
            (e.l3_enc = t(a.l3_enc)),
            (e.scalefac = t(a.scalefac)),
            (e.xrpow_max = a.xrpow_max),
            (e.part2_3_length = a.part2_3_length),
            (e.big_values = a.big_values),
            (e.count1 = a.count1),
            (e.global_gain = a.global_gain),
            (e.scalefac_compress = a.scalefac_compress),
            (e.block_type = a.block_type),
            (e.mixed_block_flag = a.mixed_block_flag),
            (e.table_select = t(a.table_select)),
            (e.subblock_gain = t(a.subblock_gain)),
            (e.region0_count = a.region0_count),
            (e.region1_count = a.region1_count),
            (e.preflag = a.preflag),
            (e.scalefac_scale = a.scalefac_scale),
            (e.count1table_select = a.count1table_select),
            (e.part2_length = a.part2_length),
            (e.sfb_lmax = a.sfb_lmax),
            (e.sfb_smin = a.sfb_smin),
            (e.psy_lmax = a.psy_lmax),
            (e.sfbmax = a.sfbmax),
            (e.psymax = a.psymax),
            (e.sfbdivide = a.sfbdivide),
            (e.width = t(a.width)),
            (e.window = t(a.window)),
            (e.count1bits = a.count1bits),
            (e.sfb_partition_table = a.sfb_partition_table.slice(0)),
            (e.slen = t(a.slen)),
            (e.max_nonzero_coeff = a.max_nonzero_coeff);
        };
      };
    },
    function (e, t) {
      function a(e, t, a, n) {
        (this.xlen = e), (this.linmax = t), (this.table = a), (this.hlen = n);
      }
      var n = {
        t1HB: [1, 1, 1, 0],
        t2HB: [1, 2, 1, 3, 1, 1, 3, 2, 0],
        t3HB: [3, 2, 1, 1, 1, 1, 3, 2, 0],
        t5HB: [1, 2, 6, 5, 3, 1, 4, 4, 7, 5, 7, 1, 6, 1, 1, 0],
        t6HB: [7, 3, 5, 1, 6, 2, 3, 2, 5, 4, 4, 1, 3, 3, 2, 0],
        t7HB: [
          1,
          2,
          10,
          19,
          16,
          10,
          3,
          3,
          7,
          10,
          5,
          3,
          11,
          4,
          13,
          17,
          8,
          4,
          12,
          11,
          18,
          15,
          11,
          2,
          7,
          6,
          9,
          14,
          3,
          1,
          6,
          4,
          5,
          3,
          2,
          0,
        ],
        t8HB: [
          3,
          4,
          6,
          18,
          12,
          5,
          5,
          1,
          2,
          16,
          9,
          3,
          7,
          3,
          5,
          14,
          7,
          3,
          19,
          17,
          15,
          13,
          10,
          4,
          13,
          5,
          8,
          11,
          5,
          1,
          12,
          4,
          4,
          1,
          1,
          0,
        ],
        t9HB: [
          7,
          5,
          9,
          14,
          15,
          7,
          6,
          4,
          5,
          5,
          6,
          7,
          7,
          6,
          8,
          8,
          8,
          5,
          15,
          6,
          9,
          10,
          5,
          1,
          11,
          7,
          9,
          6,
          4,
          1,
          14,
          4,
          6,
          2,
          6,
          0,
        ],
        t10HB: [
          1,
          2,
          10,
          23,
          35,
          30,
          12,
          17,
          3,
          3,
          8,
          12,
          18,
          21,
          12,
          7,
          11,
          9,
          15,
          21,
          32,
          40,
          19,
          6,
          14,
          13,
          22,
          34,
          46,
          23,
          18,
          7,
          20,
          19,
          33,
          47,
          27,
          22,
          9,
          3,
          31,
          22,
          41,
          26,
          21,
          20,
          5,
          3,
          14,
          13,
          10,
          11,
          16,
          6,
          5,
          1,
          9,
          8,
          7,
          8,
          4,
          4,
          2,
          0,
        ],
        t11HB: [
          3,
          4,
          10,
          24,
          34,
          33,
          21,
          15,
          5,
          3,
          4,
          10,
          32,
          17,
          11,
          10,
          11,
          7,
          13,
          18,
          30,
          31,
          20,
          5,
          25,
          11,
          19,
          59,
          27,
          18,
          12,
          5,
          35,
          33,
          31,
          58,
          30,
          16,
          7,
          5,
          28,
          26,
          32,
          19,
          17,
          15,
          8,
          14,
          14,
          12,
          9,
          13,
          14,
          9,
          4,
          1,
          11,
          4,
          6,
          6,
          6,
          3,
          2,
          0,
        ],
        t12HB: [
          9,
          6,
          16,
          33,
          41,
          39,
          38,
          26,
          7,
          5,
          6,
          9,
          23,
          16,
          26,
          11,
          17,
          7,
          11,
          14,
          21,
          30,
          10,
          7,
          17,
          10,
          15,
          12,
          18,
          28,
          14,
          5,
          32,
          13,
          22,
          19,
          18,
          16,
          9,
          5,
          40,
          17,
          31,
          29,
          17,
          13,
          4,
          2,
          27,
          12,
          11,
          15,
          10,
          7,
          4,
          1,
          27,
          12,
          8,
          12,
          6,
          3,
          1,
          0,
        ],
        t13HB: [
          1,
          5,
          14,
          21,
          34,
          51,
          46,
          71,
          42,
          52,
          68,
          52,
          67,
          44,
          43,
          19,
          3,
          4,
          12,
          19,
          31,
          26,
          44,
          33,
          31,
          24,
          32,
          24,
          31,
          35,
          22,
          14,
          15,
          13,
          23,
          36,
          59,
          49,
          77,
          65,
          29,
          40,
          30,
          40,
          27,
          33,
          42,
          16,
          22,
          20,
          37,
          61,
          56,
          79,
          73,
          64,
          43,
          76,
          56,
          37,
          26,
          31,
          25,
          14,
          35,
          16,
          60,
          57,
          97,
          75,
          114,
          91,
          54,
          73,
          55,
          41,
          48,
          53,
          23,
          24,
          58,
          27,
          50,
          96,
          76,
          70,
          93,
          84,
          77,
          58,
          79,
          29,
          74,
          49,
          41,
          17,
          47,
          45,
          78,
          74,
          115,
          94,
          90,
          79,
          69,
          83,
          71,
          50,
          59,
          38,
          36,
          15,
          72,
          34,
          56,
          95,
          92,
          85,
          91,
          90,
          86,
          73,
          77,
          65,
          51,
          44,
          43,
          42,
          43,
          20,
          30,
          44,
          55,
          78,
          72,
          87,
          78,
          61,
          46,
          54,
          37,
          30,
          20,
          16,
          53,
          25,
          41,
          37,
          44,
          59,
          54,
          81,
          66,
          76,
          57,
          54,
          37,
          18,
          39,
          11,
          35,
          33,
          31,
          57,
          42,
          82,
          72,
          80,
          47,
          58,
          55,
          21,
          22,
          26,
          38,
          22,
          53,
          25,
          23,
          38,
          70,
          60,
          51,
          36,
          55,
          26,
          34,
          23,
          27,
          14,
          9,
          7,
          34,
          32,
          28,
          39,
          49,
          75,
          30,
          52,
          48,
          40,
          52,
          28,
          18,
          17,
          9,
          5,
          45,
          21,
          34,
          64,
          56,
          50,
          49,
          45,
          31,
          19,
          12,
          15,
          10,
          7,
          6,
          3,
          48,
          23,
          20,
          39,
          36,
          35,
          53,
          21,
          16,
          23,
          13,
          10,
          6,
          1,
          4,
          2,
          16,
          15,
          17,
          27,
          25,
          20,
          29,
          11,
          17,
          12,
          16,
          8,
          1,
          1,
          0,
          1,
        ],
        t15HB: [
          7,
          12,
          18,
          53,
          47,
          76,
          124,
          108,
          89,
          123,
          108,
          119,
          107,
          81,
          122,
          63,
          13,
          5,
          16,
          27,
          46,
          36,
          61,
          51,
          42,
          70,
          52,
          83,
          65,
          41,
          59,
          36,
          19,
          17,
          15,
          24,
          41,
          34,
          59,
          48,
          40,
          64,
          50,
          78,
          62,
          80,
          56,
          33,
          29,
          28,
          25,
          43,
          39,
          63,
          55,
          93,
          76,
          59,
          93,
          72,
          54,
          75,
          50,
          29,
          52,
          22,
          42,
          40,
          67,
          57,
          95,
          79,
          72,
          57,
          89,
          69,
          49,
          66,
          46,
          27,
          77,
          37,
          35,
          66,
          58,
          52,
          91,
          74,
          62,
          48,
          79,
          63,
          90,
          62,
          40,
          38,
          125,
          32,
          60,
          56,
          50,
          92,
          78,
          65,
          55,
          87,
          71,
          51,
          73,
          51,
          70,
          30,
          109,
          53,
          49,
          94,
          88,
          75,
          66,
          122,
          91,
          73,
          56,
          42,
          64,
          44,
          21,
          25,
          90,
          43,
          41,
          77,
          73,
          63,
          56,
          92,
          77,
          66,
          47,
          67,
          48,
          53,
          36,
          20,
          71,
          34,
          67,
          60,
          58,
          49,
          88,
          76,
          67,
          106,
          71,
          54,
          38,
          39,
          23,
          15,
          109,
          53,
          51,
          47,
          90,
          82,
          58,
          57,
          48,
          72,
          57,
          41,
          23,
          27,
          62,
          9,
          86,
          42,
          40,
          37,
          70,
          64,
          52,
          43,
          70,
          55,
          42,
          25,
          29,
          18,
          11,
          11,
          118,
          68,
          30,
          55,
          50,
          46,
          74,
          65,
          49,
          39,
          24,
          16,
          22,
          13,
          14,
          7,
          91,
          44,
          39,
          38,
          34,
          63,
          52,
          45,
          31,
          52,
          28,
          19,
          14,
          8,
          9,
          3,
          123,
          60,
          58,
          53,
          47,
          43,
          32,
          22,
          37,
          24,
          17,
          12,
          15,
          10,
          2,
          1,
          71,
          37,
          34,
          30,
          28,
          20,
          17,
          26,
          21,
          16,
          10,
          6,
          8,
          6,
          2,
          0,
        ],
        t16HB: [
          1,
          5,
          14,
          44,
          74,
          63,
          110,
          93,
          172,
          149,
          138,
          242,
          225,
          195,
          376,
          17,
          3,
          4,
          12,
          20,
          35,
          62,
          53,
          47,
          83,
          75,
          68,
          119,
          201,
          107,
          207,
          9,
          15,
          13,
          23,
          38,
          67,
          58,
          103,
          90,
          161,
          72,
          127,
          117,
          110,
          209,
          206,
          16,
          45,
          21,
          39,
          69,
          64,
          114,
          99,
          87,
          158,
          140,
          252,
          212,
          199,
          387,
          365,
          26,
          75,
          36,
          68,
          65,
          115,
          101,
          179,
          164,
          155,
          264,
          246,
          226,
          395,
          382,
          362,
          9,
          66,
          30,
          59,
          56,
          102,
          185,
          173,
          265,
          142,
          253,
          232,
          400,
          388,
          378,
          445,
          16,
          111,
          54,
          52,
          100,
          184,
          178,
          160,
          133,
          257,
          244,
          228,
          217,
          385,
          366,
          715,
          10,
          98,
          48,
          91,
          88,
          165,
          157,
          148,
          261,
          248,
          407,
          397,
          372,
          380,
          889,
          884,
          8,
          85,
          84,
          81,
          159,
          156,
          143,
          260,
          249,
          427,
          401,
          392,
          383,
          727,
          713,
          708,
          7,
          154,
          76,
          73,
          141,
          131,
          256,
          245,
          426,
          406,
          394,
          384,
          735,
          359,
          710,
          352,
          11,
          139,
          129,
          67,
          125,
          247,
          233,
          229,
          219,
          393,
          743,
          737,
          720,
          885,
          882,
          439,
          4,
          243,
          120,
          118,
          115,
          227,
          223,
          396,
          746,
          742,
          736,
          721,
          712,
          706,
          223,
          436,
          6,
          202,
          224,
          222,
          218,
          216,
          389,
          386,
          381,
          364,
          888,
          443,
          707,
          440,
          437,
          1728,
          4,
          747,
          211,
          210,
          208,
          370,
          379,
          734,
          723,
          714,
          1735,
          883,
          877,
          876,
          3459,
          865,
          2,
          377,
          369,
          102,
          187,
          726,
          722,
          358,
          711,
          709,
          866,
          1734,
          871,
          3458,
          870,
          434,
          0,
          12,
          10,
          7,
          11,
          10,
          17,
          11,
          9,
          13,
          12,
          10,
          7,
          5,
          3,
          1,
          3,
        ],
        t24HB: [
          15,
          13,
          46,
          80,
          146,
          262,
          248,
          434,
          426,
          669,
          653,
          649,
          621,
          517,
          1032,
          88,
          14,
          12,
          21,
          38,
          71,
          130,
          122,
          216,
          209,
          198,
          327,
          345,
          319,
          297,
          279,
          42,
          47,
          22,
          41,
          74,
          68,
          128,
          120,
          221,
          207,
          194,
          182,
          340,
          315,
          295,
          541,
          18,
          81,
          39,
          75,
          70,
          134,
          125,
          116,
          220,
          204,
          190,
          178,
          325,
          311,
          293,
          271,
          16,
          147,
          72,
          69,
          135,
          127,
          118,
          112,
          210,
          200,
          188,
          352,
          323,
          306,
          285,
          540,
          14,
          263,
          66,
          129,
          126,
          119,
          114,
          214,
          202,
          192,
          180,
          341,
          317,
          301,
          281,
          262,
          12,
          249,
          123,
          121,
          117,
          113,
          215,
          206,
          195,
          185,
          347,
          330,
          308,
          291,
          272,
          520,
          10,
          435,
          115,
          111,
          109,
          211,
          203,
          196,
          187,
          353,
          332,
          313,
          298,
          283,
          531,
          381,
          17,
          427,
          212,
          208,
          205,
          201,
          193,
          186,
          177,
          169,
          320,
          303,
          286,
          268,
          514,
          377,
          16,
          335,
          199,
          197,
          191,
          189,
          181,
          174,
          333,
          321,
          305,
          289,
          275,
          521,
          379,
          371,
          11,
          668,
          184,
          183,
          179,
          175,
          344,
          331,
          314,
          304,
          290,
          277,
          530,
          383,
          373,
          366,
          10,
          652,
          346,
          171,
          168,
          164,
          318,
          309,
          299,
          287,
          276,
          263,
          513,
          375,
          368,
          362,
          6,
          648,
          322,
          316,
          312,
          307,
          302,
          292,
          284,
          269,
          261,
          512,
          376,
          370,
          364,
          359,
          4,
          620,
          300,
          296,
          294,
          288,
          282,
          273,
          266,
          515,
          380,
          374,
          369,
          365,
          361,
          357,
          2,
          1033,
          280,
          278,
          274,
          267,
          264,
          259,
          382,
          378,
          372,
          367,
          363,
          360,
          358,
          356,
          0,
          43,
          20,
          19,
          17,
          15,
          13,
          11,
          9,
          7,
          6,
          4,
          7,
          5,
          3,
          1,
          3,
        ],
        t32HB: [1, 10, 8, 20, 12, 20, 16, 32, 14, 12, 24, 0, 28, 16, 24, 16],
        t33HB: [15, 28, 26, 48, 22, 40, 36, 64, 14, 24, 20, 32, 12, 16, 8, 0],
        t1l: [1, 4, 3, 5],
        t2l: [1, 4, 7, 4, 5, 7, 6, 7, 8],
        t3l: [2, 3, 7, 4, 4, 7, 6, 7, 8],
        t5l: [1, 4, 7, 8, 4, 5, 8, 9, 7, 8, 9, 10, 8, 8, 9, 10],
        t6l: [3, 4, 6, 8, 4, 4, 6, 7, 5, 6, 7, 8, 7, 7, 8, 9],
        t7l: [
          1,
          4,
          7,
          9,
          9,
          10,
          4,
          6,
          8,
          9,
          9,
          10,
          7,
          7,
          9,
          10,
          10,
          11,
          8,
          9,
          10,
          11,
          11,
          11,
          8,
          9,
          10,
          11,
          11,
          12,
          9,
          10,
          11,
          12,
          12,
          12,
        ],
        t8l: [
          2,
          4,
          7,
          9,
          9,
          10,
          4,
          4,
          6,
          10,
          10,
          10,
          7,
          6,
          8,
          10,
          10,
          11,
          9,
          10,
          10,
          11,
          11,
          12,
          9,
          9,
          10,
          11,
          12,
          12,
          10,
          10,
          11,
          11,
          13,
          13,
        ],
        t9l: [
          3,
          4,
          6,
          7,
          9,
          10,
          4,
          5,
          6,
          7,
          8,
          10,
          5,
          6,
          7,
          8,
          9,
          10,
          7,
          7,
          8,
          9,
          9,
          10,
          8,
          8,
          9,
          9,
          10,
          11,
          9,
          9,
          10,
          10,
          11,
          11,
        ],
        t10l: [
          1,
          4,
          7,
          9,
          10,
          10,
          10,
          11,
          4,
          6,
          8,
          9,
          10,
          11,
          10,
          10,
          7,
          8,
          9,
          10,
          11,
          12,
          11,
          11,
          8,
          9,
          10,
          11,
          12,
          12,
          11,
          12,
          9,
          10,
          11,
          12,
          12,
          12,
          12,
          12,
          10,
          11,
          12,
          12,
          13,
          13,
          12,
          13,
          9,
          10,
          11,
          12,
          12,
          12,
          13,
          13,
          10,
          10,
          11,
          12,
          12,
          13,
          13,
          13,
        ],
        t11l: [
          2,
          4,
          6,
          8,
          9,
          10,
          9,
          10,
          4,
          5,
          6,
          8,
          10,
          10,
          9,
          10,
          6,
          7,
          8,
          9,
          10,
          11,
          10,
          10,
          8,
          8,
          9,
          11,
          10,
          12,
          10,
          11,
          9,
          10,
          10,
          11,
          11,
          12,
          11,
          12,
          9,
          10,
          11,
          12,
          12,
          13,
          12,
          13,
          9,
          9,
          9,
          10,
          11,
          12,
          12,
          12,
          9,
          9,
          10,
          11,
          12,
          12,
          12,
          12,
        ],
        t12l: [
          4,
          4,
          6,
          8,
          9,
          10,
          10,
          10,
          4,
          5,
          6,
          7,
          9,
          9,
          10,
          10,
          6,
          6,
          7,
          8,
          9,
          10,
          9,
          10,
          7,
          7,
          8,
          8,
          9,
          10,
          10,
          10,
          8,
          8,
          9,
          9,
          10,
          10,
          10,
          11,
          9,
          9,
          10,
          10,
          10,
          11,
          10,
          11,
          9,
          9,
          9,
          10,
          10,
          11,
          11,
          12,
          10,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
        ],
        t13l: [
          1,
          5,
          7,
          8,
          9,
          10,
          10,
          11,
          10,
          11,
          12,
          12,
          13,
          13,
          14,
          14,
          4,
          6,
          8,
          9,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          13,
          14,
          14,
          14,
          7,
          8,
          9,
          10,
          11,
          11,
          12,
          12,
          11,
          12,
          12,
          13,
          13,
          14,
          15,
          15,
          8,
          9,
          10,
          11,
          11,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          14,
          15,
          15,
          9,
          9,
          11,
          11,
          12,
          12,
          13,
          13,
          12,
          13,
          13,
          14,
          14,
          15,
          15,
          16,
          10,
          10,
          11,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          14,
          13,
          15,
          15,
          16,
          16,
          10,
          11,
          12,
          12,
          13,
          13,
          13,
          13,
          13,
          14,
          14,
          14,
          15,
          15,
          16,
          16,
          11,
          11,
          12,
          13,
          13,
          13,
          14,
          14,
          14,
          14,
          15,
          15,
          15,
          16,
          18,
          18,
          10,
          10,
          11,
          12,
          12,
          13,
          13,
          14,
          14,
          14,
          14,
          15,
          15,
          16,
          17,
          17,
          11,
          11,
          12,
          12,
          13,
          13,
          13,
          15,
          14,
          15,
          15,
          16,
          16,
          16,
          18,
          17,
          11,
          12,
          12,
          13,
          13,
          14,
          14,
          15,
          14,
          15,
          16,
          15,
          16,
          17,
          18,
          19,
          12,
          12,
          12,
          13,
          14,
          14,
          14,
          14,
          15,
          15,
          15,
          16,
          17,
          17,
          17,
          18,
          12,
          13,
          13,
          14,
          14,
          15,
          14,
          15,
          16,
          16,
          17,
          17,
          17,
          18,
          18,
          18,
          13,
          13,
          14,
          15,
          15,
          15,
          16,
          16,
          16,
          16,
          16,
          17,
          18,
          17,
          18,
          18,
          14,
          14,
          14,
          15,
          15,
          15,
          17,
          16,
          16,
          19,
          17,
          17,
          17,
          19,
          18,
          18,
          13,
          14,
          15,
          16,
          16,
          16,
          17,
          16,
          17,
          17,
          18,
          18,
          21,
          20,
          21,
          18,
        ],
        t15l: [
          3,
          5,
          6,
          8,
          8,
          9,
          10,
          10,
          10,
          11,
          11,
          12,
          12,
          12,
          13,
          14,
          5,
          5,
          7,
          8,
          9,
          9,
          10,
          10,
          10,
          11,
          11,
          12,
          12,
          12,
          13,
          13,
          6,
          7,
          7,
          8,
          9,
          9,
          10,
          10,
          10,
          11,
          11,
          12,
          12,
          13,
          13,
          13,
          7,
          8,
          8,
          9,
          9,
          10,
          10,
          11,
          11,
          11,
          12,
          12,
          12,
          13,
          13,
          13,
          8,
          8,
          9,
          9,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          13,
          13,
          13,
          9,
          9,
          9,
          10,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          13,
          13,
          13,
          14,
          10,
          9,
          10,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          13,
          13,
          14,
          14,
          10,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          14,
          10,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          13,
          13,
          14,
          14,
          14,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          14,
          14,
          14,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          14,
          15,
          14,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          14,
          14,
          14,
          15,
          12,
          12,
          11,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          13,
          13,
          14,
          14,
          15,
          15,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          14,
          14,
          14,
          14,
          14,
          15,
          15,
          13,
          13,
          13,
          13,
          13,
          13,
          13,
          13,
          14,
          14,
          14,
          14,
          15,
          15,
          14,
          15,
          13,
          13,
          13,
          13,
          13,
          13,
          13,
          14,
          14,
          14,
          14,
          14,
          15,
          15,
          15,
          15,
        ],
        t16_5l: [
          1,
          5,
          7,
          9,
          10,
          10,
          11,
          11,
          12,
          12,
          12,
          13,
          13,
          13,
          14,
          11,
          4,
          6,
          8,
          9,
          10,
          11,
          11,
          11,
          12,
          12,
          12,
          13,
          14,
          13,
          14,
          11,
          7,
          8,
          9,
          10,
          11,
          11,
          12,
          12,
          13,
          12,
          13,
          13,
          13,
          14,
          14,
          12,
          9,
          9,
          10,
          11,
          11,
          12,
          12,
          12,
          13,
          13,
          14,
          14,
          14,
          15,
          15,
          13,
          10,
          10,
          11,
          11,
          12,
          12,
          13,
          13,
          13,
          14,
          14,
          14,
          15,
          15,
          15,
          12,
          10,
          10,
          11,
          11,
          12,
          13,
          13,
          14,
          13,
          14,
          14,
          15,
          15,
          15,
          16,
          13,
          11,
          11,
          11,
          12,
          13,
          13,
          13,
          13,
          14,
          14,
          14,
          14,
          15,
          15,
          16,
          13,
          11,
          11,
          12,
          12,
          13,
          13,
          13,
          14,
          14,
          15,
          15,
          15,
          15,
          17,
          17,
          13,
          11,
          12,
          12,
          13,
          13,
          13,
          14,
          14,
          15,
          15,
          15,
          15,
          16,
          16,
          16,
          13,
          12,
          12,
          12,
          13,
          13,
          14,
          14,
          15,
          15,
          15,
          15,
          16,
          15,
          16,
          15,
          14,
          12,
          13,
          12,
          13,
          14,
          14,
          14,
          14,
          15,
          16,
          16,
          16,
          17,
          17,
          16,
          13,
          13,
          13,
          13,
          13,
          14,
          14,
          15,
          16,
          16,
          16,
          16,
          16,
          16,
          15,
          16,
          14,
          13,
          14,
          14,
          14,
          14,
          15,
          15,
          15,
          15,
          17,
          16,
          16,
          16,
          16,
          18,
          14,
          15,
          14,
          14,
          14,
          15,
          15,
          16,
          16,
          16,
          18,
          17,
          17,
          17,
          19,
          17,
          14,
          14,
          15,
          13,
          14,
          16,
          16,
          15,
          16,
          16,
          17,
          18,
          17,
          19,
          17,
          16,
          14,
          11,
          11,
          11,
          12,
          12,
          13,
          13,
          13,
          14,
          14,
          14,
          14,
          14,
          14,
          14,
          12,
        ],
        t16l: [
          1,
          5,
          7,
          9,
          10,
          10,
          11,
          11,
          12,
          12,
          12,
          13,
          13,
          13,
          14,
          10,
          4,
          6,
          8,
          9,
          10,
          11,
          11,
          11,
          12,
          12,
          12,
          13,
          14,
          13,
          14,
          10,
          7,
          8,
          9,
          10,
          11,
          11,
          12,
          12,
          13,
          12,
          13,
          13,
          13,
          14,
          14,
          11,
          9,
          9,
          10,
          11,
          11,
          12,
          12,
          12,
          13,
          13,
          14,
          14,
          14,
          15,
          15,
          12,
          10,
          10,
          11,
          11,
          12,
          12,
          13,
          13,
          13,
          14,
          14,
          14,
          15,
          15,
          15,
          11,
          10,
          10,
          11,
          11,
          12,
          13,
          13,
          14,
          13,
          14,
          14,
          15,
          15,
          15,
          16,
          12,
          11,
          11,
          11,
          12,
          13,
          13,
          13,
          13,
          14,
          14,
          14,
          14,
          15,
          15,
          16,
          12,
          11,
          11,
          12,
          12,
          13,
          13,
          13,
          14,
          14,
          15,
          15,
          15,
          15,
          17,
          17,
          12,
          11,
          12,
          12,
          13,
          13,
          13,
          14,
          14,
          15,
          15,
          15,
          15,
          16,
          16,
          16,
          12,
          12,
          12,
          12,
          13,
          13,
          14,
          14,
          15,
          15,
          15,
          15,
          16,
          15,
          16,
          15,
          13,
          12,
          13,
          12,
          13,
          14,
          14,
          14,
          14,
          15,
          16,
          16,
          16,
          17,
          17,
          16,
          12,
          13,
          13,
          13,
          13,
          14,
          14,
          15,
          16,
          16,
          16,
          16,
          16,
          16,
          15,
          16,
          13,
          13,
          14,
          14,
          14,
          14,
          15,
          15,
          15,
          15,
          17,
          16,
          16,
          16,
          16,
          18,
          13,
          15,
          14,
          14,
          14,
          15,
          15,
          16,
          16,
          16,
          18,
          17,
          17,
          17,
          19,
          17,
          13,
          14,
          15,
          13,
          14,
          16,
          16,
          15,
          16,
          16,
          17,
          18,
          17,
          19,
          17,
          16,
          13,
          10,
          10,
          10,
          11,
          11,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          13,
          13,
          13,
          10,
        ],
        t24l: [
          4,
          5,
          7,
          8,
          9,
          10,
          10,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          13,
          10,
          5,
          6,
          7,
          8,
          9,
          10,
          10,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          10,
          7,
          7,
          8,
          9,
          9,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          13,
          9,
          8,
          8,
          9,
          9,
          10,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          9,
          9,
          9,
          9,
          10,
          10,
          10,
          10,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          13,
          9,
          10,
          9,
          10,
          10,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          9,
          10,
          10,
          10,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          13,
          9,
          11,
          10,
          10,
          10,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          10,
          11,
          11,
          11,
          11,
          11,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          13,
          13,
          10,
          11,
          11,
          11,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          10,
          12,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          10,
          12,
          12,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          10,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          13,
          10,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          13,
          13,
          13,
          10,
          13,
          12,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          13,
          13,
          13,
          13,
          10,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          10,
          10,
          10,
          10,
          6,
        ],
        t32l: [1, 5, 5, 7, 5, 8, 7, 9, 5, 7, 7, 9, 7, 9, 9, 10],
        t33l: [4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8],
      };
      (n.ht = [
        new a(0, 0, null, null),
        new a(2, 0, n.t1HB, n.t1l),
        new a(3, 0, n.t2HB, n.t2l),
        new a(3, 0, n.t3HB, n.t3l),
        new a(0, 0, null, null),
        new a(4, 0, n.t5HB, n.t5l),
        new a(4, 0, n.t6HB, n.t6l),
        new a(6, 0, n.t7HB, n.t7l),
        new a(6, 0, n.t8HB, n.t8l),
        new a(6, 0, n.t9HB, n.t9l),
        new a(8, 0, n.t10HB, n.t10l),
        new a(8, 0, n.t11HB, n.t11l),
        new a(8, 0, n.t12HB, n.t12l),
        new a(16, 0, n.t13HB, n.t13l),
        new a(0, 0, null, n.t16_5l),
        new a(16, 0, n.t15HB, n.t15l),
        new a(1, 1, n.t16HB, n.t16l),
        new a(2, 3, n.t16HB, n.t16l),
        new a(3, 7, n.t16HB, n.t16l),
        new a(4, 15, n.t16HB, n.t16l),
        new a(6, 63, n.t16HB, n.t16l),
        new a(8, 255, n.t16HB, n.t16l),
        new a(10, 1023, n.t16HB, n.t16l),
        new a(13, 8191, n.t16HB, n.t16l),
        new a(4, 15, n.t24HB, n.t24l),
        new a(5, 31, n.t24HB, n.t24l),
        new a(6, 63, n.t24HB, n.t24l),
        new a(7, 127, n.t24HB, n.t24l),
        new a(8, 255, n.t24HB, n.t24l),
        new a(9, 511, n.t24HB, n.t24l),
        new a(11, 2047, n.t24HB, n.t24l),
        new a(13, 8191, n.t24HB, n.t24l),
        new a(0, 0, n.t32HB, n.t32l),
        new a(0, 0, n.t33HB, n.t33l),
      ]),
        (n.largetbl = [
          65540,
          327685,
          458759,
          589832,
          655369,
          655370,
          720906,
          720907,
          786443,
          786444,
          786444,
          851980,
          851980,
          851980,
          917517,
          655370,
          262149,
          393222,
          524295,
          589832,
          655369,
          720906,
          720906,
          720907,
          786443,
          786443,
          786444,
          851980,
          917516,
          851980,
          917516,
          655370,
          458759,
          524295,
          589832,
          655369,
          720905,
          720906,
          786442,
          786443,
          851979,
          786443,
          851979,
          851980,
          851980,
          917516,
          917517,
          720905,
          589832,
          589832,
          655369,
          720905,
          720906,
          786442,
          786442,
          786443,
          851979,
          851979,
          917515,
          917516,
          917516,
          983052,
          983052,
          786441,
          655369,
          655369,
          720905,
          720906,
          786442,
          786442,
          851978,
          851979,
          851979,
          917515,
          917516,
          917516,
          983052,
          983052,
          983053,
          720905,
          655370,
          655369,
          720906,
          720906,
          786442,
          851978,
          851979,
          917515,
          851979,
          917515,
          917516,
          983052,
          983052,
          983052,
          1048588,
          786441,
          720906,
          720906,
          720906,
          786442,
          851978,
          851979,
          851979,
          851979,
          917515,
          917516,
          917516,
          917516,
          983052,
          983052,
          1048589,
          786441,
          720907,
          720906,
          786442,
          786442,
          851979,
          851979,
          851979,
          917515,
          917516,
          983052,
          983052,
          983052,
          983052,
          1114125,
          1114125,
          786442,
          720907,
          786443,
          786443,
          851979,
          851979,
          851979,
          917515,
          917515,
          983051,
          983052,
          983052,
          983052,
          1048588,
          1048589,
          1048589,
          786442,
          786443,
          786443,
          786443,
          851979,
          851979,
          917515,
          917515,
          983052,
          983052,
          983052,
          983052,
          1048588,
          983053,
          1048589,
          983053,
          851978,
          786444,
          851979,
          786443,
          851979,
          917515,
          917516,
          917516,
          917516,
          983052,
          1048588,
          1048588,
          1048589,
          1114125,
          1114125,
          1048589,
          786442,
          851980,
          851980,
          851979,
          851979,
          917515,
          917516,
          983052,
          1048588,
          1048588,
          1048588,
          1048588,
          1048589,
          1048589,
          983053,
          1048589,
          851978,
          851980,
          917516,
          917516,
          917516,
          917516,
          983052,
          983052,
          983052,
          983052,
          1114124,
          1048589,
          1048589,
          1048589,
          1048589,
          1179661,
          851978,
          983052,
          917516,
          917516,
          917516,
          983052,
          983052,
          1048588,
          1048588,
          1048589,
          1179661,
          1114125,
          1114125,
          1114125,
          1245197,
          1114125,
          851978,
          917517,
          983052,
          851980,
          917516,
          1048588,
          1048588,
          983052,
          1048589,
          1048589,
          1114125,
          1179661,
          1114125,
          1245197,
          1114125,
          1048589,
          851978,
          655369,
          655369,
          655369,
          720905,
          720905,
          786441,
          786441,
          786441,
          851977,
          851977,
          851977,
          851978,
          851978,
          851978,
          851978,
          655366,
        ]),
        (n.table23 = [
          65538,
          262147,
          458759,
          262148,
          327684,
          458759,
          393222,
          458759,
          524296,
        ]),
        (n.table56 = [
          65539,
          262148,
          458758,
          524296,
          262148,
          327684,
          524294,
          589831,
          458757,
          524294,
          589831,
          655368,
          524295,
          524295,
          589832,
          655369,
        ]),
        (n.bitrate_table = [
          [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1],
          [
            0,
            32,
            40,
            48,
            56,
            64,
            80,
            96,
            112,
            128,
            160,
            192,
            224,
            256,
            320,
            -1,
          ],
          [0, 8, 16, 24, 32, 40, 48, 56, 64, -1, -1, -1, -1, -1, -1, -1],
        ]),
        (n.samplerate_table = [
          [22050, 24e3, 16e3, -1],
          [44100, 48e3, 32e3, -1],
          [11025, 12e3, 8e3, -1],
        ]),
        (n.scfsi_band = [0, 6, 11, 16, 21]),
        (e.exports = n);
    },
    function (e, t, a) {
      var n = a(1),
        s = a(0),
        r = s.System,
        _ =
          (s.VbrMode,
          s.Float,
          s.ShortBlock,
          s.Util,
          s.Arrays,
          s.new_array_n,
          s.new_byte,
          s.new_double,
          s.new_float),
        i = s.new_float_n;
      s.new_int, s.new_int_n, s.assert;
      e.exports = function () {
        (this.l = _(n.SBMAX_l)), (this.s = i([n.SBMAX_s, 3]));
        var e = this;
        this.assign = function (t) {
          r.arraycopy(t.l, 0, e.l, 0, n.SBMAX_l);
          for (var a = 0; a < n.SBMAX_s; a++)
            for (var s = 0; s < 3; s++) e.s[a][s] = t.s[a][s];
        };
      };
    },
    function (e, t) {
      function a(e) {
        var t = e;
        this.ordinal = function () {
          return t;
        };
      }
      (a.STEREO = new a(0)),
        (a.JOINT_STEREO = new a(1)),
        (a.DUAL_CHANNEL = new a(2)),
        (a.MONO = new a(3)),
        (a.NOT_SET = new a(4)),
        (e.exports = a);
    },
    function (e, t, a) {
      var n = a(0),
        s = n.System,
        r =
          (n.VbrMode,
          n.Float,
          n.ShortBlock,
          n.Util,
          n.Arrays,
          n.new_array_n,
          n.new_byte,
          n.new_double,
          n.new_float,
          n.new_float_n,
          n.new_int),
        _ = (n.new_int_n, n.assert, a(1));
      e.exports = function (e, t, a, n) {
        (this.l = r(1 + _.SBMAX_l)),
          (this.s = r(1 + _.SBMAX_s)),
          (this.psfb21 = r(1 + _.PSFB21)),
          (this.psfb12 = r(1 + _.PSFB12));
        var i = this.l,
          o = this.s;
        4 == arguments.length &&
          ((this.arrL = arguments[0]),
          (this.arrS = arguments[1]),
          (this.arr21 = arguments[2]),
          (this.arr12 = arguments[3]),
          s.arraycopy(
            this.arrL,
            0,
            i,
            0,
            Math.min(this.arrL.length, this.l.length)
          ),
          s.arraycopy(
            this.arrS,
            0,
            o,
            0,
            Math.min(this.arrS.length, this.s.length)
          ),
          s.arraycopy(
            this.arr21,
            0,
            this.psfb21,
            0,
            Math.min(this.arr21.length, this.psfb21.length)
          ),
          s.arraycopy(
            this.arr12,
            0,
            this.psfb12,
            0,
            Math.min(this.arr12.length, this.psfb12.length)
          ));
      };
    },
    function (e, t, a) {
      var n = a(0),
        s = n.System,
        r = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays);
      n.new_array_n,
        n.new_byte,
        n.new_double,
        n.new_float,
        n.new_float_n,
        n.new_int,
        n.new_int_n,
        n.assert;
      function _() {
        _.YULE_ORDER, _.MAX_SAMP_FREQ;
        var e = _.RMS_WINDOW_TIME_NUMERATOR,
          t = _.RMS_WINDOW_TIME_DENOMINATOR,
          a =
            (_.MAX_SAMPLES_PER_WINDOW,
            [
              [
                0.038575994352,
                -3.84664617118067,
                -0.02160367184185,
                7.81501653005538,
                -0.00123395316851,
                -11.34170355132042,
                -9291677959e-14,
                13.05504219327545,
                -0.01655260341619,
                -12.28759895145294,
                0.02161526843274,
                9.4829380631979,
                -0.02074045215285,
                -5.87257861775999,
                0.00594298065125,
                2.75465861874613,
                0.00306428023191,
                -0.86984376593551,
                0.00012025322027,
                0.13919314567432,
                0.00288463683916,
              ],
              [
                0.0541865640643,
                -3.47845948550071,
                -0.02911007808948,
                6.36317777566148,
                -0.00848709379851,
                -8.54751527471874,
                -0.00851165645469,
                9.4769360780128,
                -0.00834990904936,
                -8.81498681370155,
                0.02245293253339,
                6.85401540936998,
                -0.02596338512915,
                -4.39470996079559,
                0.01624864962975,
                2.19611684890774,
                -0.00240879051584,
                -0.75104302451432,
                0.00674613682247,
                0.13149317958808,
                -0.00187763777362,
              ],
              [
                0.15457299681924,
                -2.37898834973084,
                -0.09331049056315,
                2.84868151156327,
                -0.06247880153653,
                -2.64577170229825,
                0.02163541888798,
                2.23697657451713,
                -0.05588393329856,
                -1.67148153367602,
                0.04781476674921,
                1.00595954808547,
                0.00222312597743,
                -0.45953458054983,
                0.03174092540049,
                0.16378164858596,
                -0.01390589421898,
                -0.05032077717131,
                0.00651420667831,
                0.0234789740702,
                -0.00881362733839,
              ],
              [
                0.30296907319327,
                -1.61273165137247,
                -0.22613988682123,
                1.0797749225997,
                -0.08587323730772,
                -0.2565625775407,
                0.03282930172664,
                -0.1627671912044,
                -0.00915702933434,
                -0.22638893773906,
                -0.02364141202522,
                0.39120800788284,
                -0.00584456039913,
                -0.22138138954925,
                0.06276101321749,
                0.04500235387352,
                -828086748e-14,
                0.02005851806501,
                0.00205861885564,
                0.00302439095741,
                -0.02950134983287,
              ],
              [
                0.33642304856132,
                -1.49858979367799,
                -0.2557224142557,
                0.87350271418188,
                -0.11828570177555,
                0.12205022308084,
                0.11921148675203,
                -0.80774944671438,
                -0.07834489609479,
                0.47854794562326,
                -0.0046997791438,
                -0.12453458140019,
                -0.0058950022444,
                -0.04067510197014,
                0.05724228140351,
                0.08333755284107,
                0.00832043980773,
                -0.04237348025746,
                -0.0163538138454,
                0.02977207319925,
                -0.0176017656815,
              ],
              [
                0.4491525660845,
                -0.62820619233671,
                -0.14351757464547,
                0.29661783706366,
                -0.22784394429749,
                -0.372563729424,
                -0.01419140100551,
                0.00213767857124,
                0.04078262797139,
                -0.42029820170918,
                -0.12398163381748,
                0.22199650564824,
                0.04097565135648,
                0.00613424350682,
                0.10478503600251,
                0.06747620744683,
                -0.01863887810927,
                0.05784820375801,
                -0.03193428438915,
                0.03222754072173,
                0.00541907748707,
              ],
              [
                0.56619470757641,
                -1.04800335126349,
                -0.75464456939302,
                0.29156311971249,
                0.1624213774223,
                -0.26806001042947,
                0.16744243493672,
                0.00819999645858,
                -0.18901604199609,
                0.45054734505008,
                0.3093178284183,
                -0.33032403314006,
                -0.27562961986224,
                0.0673936833311,
                0.00647310677246,
                -0.04784254229033,
                0.08647503780351,
                0.01639907836189,
                -0.0378898455484,
                0.01807364323573,
                -0.00588215443421,
              ],
              [
                0.58100494960553,
                -0.51035327095184,
                -0.53174909058578,
                -0.31863563325245,
                -0.14289799034253,
                -0.20256413484477,
                0.17520704835522,
                0.1472815413433,
                0.02377945217615,
                0.38952639978999,
                0.15558449135573,
                -0.23313271880868,
                -0.25344790059353,
                -0.05246019024463,
                0.01628462406333,
                -0.02505961724053,
                0.06920467763959,
                0.02442357316099,
                -0.03721611395801,
                0.01818801111503,
                -0.00749618797172,
              ],
              [
                0.53648789255105,
                -0.2504987195602,
                -0.42163034350696,
                -0.43193942311114,
                -0.00275953611929,
                -0.03424681017675,
                0.04267842219415,
                -0.04678328784242,
                -0.10214864179676,
                0.26408300200955,
                0.14590772289388,
                0.15113130533216,
                -0.02459864859345,
                -0.17556493366449,
                -0.11202315195388,
                -0.18823009262115,
                -0.04060034127,
                0.05477720428674,
                0.0478866554818,
                0.0470440968812,
                -0.02217936801134,
              ],
            ]),
          n = [
            [
              0.98621192462708,
              -1.97223372919527,
              -1.97242384925416,
              0.97261396931306,
              0.98621192462708,
            ],
            [
              0.98500175787242,
              -1.96977855582618,
              -1.97000351574484,
              0.9702284756635,
              0.98500175787242,
            ],
            [
              0.97938932735214,
              -1.95835380975398,
              -1.95877865470428,
              0.95920349965459,
              0.97938932735214,
            ],
            [
              0.97531843204928,
              -1.95002759149878,
              -1.95063686409857,
              0.95124613669835,
              0.97531843204928,
            ],
            [
              0.97316523498161,
              -1.94561023566527,
              -1.94633046996323,
              0.94705070426118,
              0.97316523498161,
            ],
            [
              0.96454515552826,
              -1.92783286977036,
              -1.92909031105652,
              0.93034775234268,
              0.96454515552826,
            ],
            [
              0.96009142950541,
              -1.91858953033784,
              -1.92018285901082,
              0.92177618768381,
              0.96009142950541,
            ],
            [
              0.95856916599601,
              -1.9154210807478,
              -1.91713833199203,
              0.91885558323625,
              0.95856916599601,
            ],
            [
              0.94597685600279,
              -1.88903307939452,
              -1.89195371200558,
              0.89487434461664,
              0.94597685600279,
            ],
          ];
        function i(e, t, a, n, s, r) {
          for (; 0 != s--; )
            (a[n] =
              1e-10 +
              e[t + 0] * r[0] -
              a[n - 1] * r[1] +
              e[t - 1] * r[2] -
              a[n - 2] * r[3] +
              e[t - 2] * r[4] -
              a[n - 3] * r[5] +
              e[t - 3] * r[6] -
              a[n - 4] * r[7] +
              e[t - 4] * r[8] -
              a[n - 5] * r[9] +
              e[t - 5] * r[10] -
              a[n - 6] * r[11] +
              e[t - 6] * r[12] -
              a[n - 7] * r[13] +
              e[t - 7] * r[14] -
              a[n - 8] * r[15] +
              e[t - 8] * r[16] -
              a[n - 9] * r[17] +
              e[t - 9] * r[18] -
              a[n - 10] * r[19] +
              e[t - 10] * r[20]),
              ++n,
              ++t;
        }
        function o(e, t, a, n, s, r) {
          for (; 0 != s--; )
            (a[n] =
              e[t + 0] * r[0] -
              a[n - 1] * r[1] +
              e[t - 1] * r[2] -
              a[n - 2] * r[3] +
              e[t - 2] * r[4]),
              ++n,
              ++t;
        }
        function l(e) {
          return e * e;
        }
        (this.InitGainAnalysis = function (a, n) {
          return (function (a, n) {
            for (var s = 0; s < MAX_ORDER; s++)
              a.linprebuf[s] = a.lstepbuf[s] = a.loutbuf[s] = a.rinprebuf[
                s
              ] = a.rstepbuf[s] = a.routbuf[s] = 0;
            switch (0 | n) {
              case 48e3:
                a.reqindex = 0;
                break;
              case 44100:
                a.reqindex = 1;
                break;
              case 32e3:
                a.reqindex = 2;
                break;
              case 24e3:
                a.reqindex = 3;
                break;
              case 22050:
                a.reqindex = 4;
                break;
              case 16e3:
                a.reqindex = 5;
                break;
              case 12e3:
                a.reqindex = 6;
                break;
              case 11025:
                a.reqindex = 7;
                break;
              case 8e3:
                a.reqindex = 8;
                break;
              default:
                return INIT_GAIN_ANALYSIS_ERROR;
            }
            return (
              (a.sampleWindow = 0 | ((n * e + t - 1) / t)),
              (a.lsum = 0),
              (a.rsum = 0),
              (a.totsamp = 0),
              r.ill(a.A, 0),
              INIT_GAIN_ANALYSIS_OK
            );
          })(a, n) != INIT_GAIN_ANALYSIS_OK
            ? INIT_GAIN_ANALYSIS_ERROR
            : ((a.linpre = MAX_ORDER),
              (a.rinpre = MAX_ORDER),
              (a.lstep = MAX_ORDER),
              (a.rstep = MAX_ORDER),
              (a.lout = MAX_ORDER),
              (a.rout = MAX_ORDER),
              r.fill(a.B, 0),
              INIT_GAIN_ANALYSIS_OK);
        }),
          (this.AnalyzeSamples = function (e, t, r, f, c, u, h) {
            var b, m, p, d, v, g, S;
            if (0 == u) return GAIN_ANALYSIS_OK;
            switch (((S = 0), (v = u), h)) {
              case 1:
                (f = t), (c = r);
                break;
              case 2:
                break;
              default:
                return GAIN_ANALYSIS_ERROR;
            }
            for (
              u < MAX_ORDER
                ? (s.arraycopy(t, r, e.linprebuf, MAX_ORDER, u),
                  s.arraycopy(f, c, e.rinprebuf, MAX_ORDER, u))
                : (s.arraycopy(t, r, e.linprebuf, MAX_ORDER, MAX_ORDER),
                  s.arraycopy(f, c, e.rinprebuf, MAX_ORDER, MAX_ORDER));
              v > 0;

            ) {
              (g =
                v > e.sampleWindow - e.totsamp
                  ? e.sampleWindow - e.totsamp
                  : v),
                S < MAX_ORDER
                  ? ((b = e.linpre + S),
                    (m = e.linprebuf),
                    (p = e.rinpre + S),
                    (d = e.rinprebuf),
                    g > MAX_ORDER - S && (g = MAX_ORDER - S))
                  : ((b = r + S), (m = t), (p = c + S), (d = f)),
                i(m, b, e.lstepbuf, e.lstep + e.totsamp, g, a[e.reqindex]),
                i(d, p, e.rstepbuf, e.rstep + e.totsamp, g, a[e.reqindex]),
                o(
                  e.lstepbuf,
                  e.lstep + e.totsamp,
                  e.loutbuf,
                  e.lout + e.totsamp,
                  g,
                  n[e.reqindex]
                ),
                o(
                  e.rstepbuf,
                  e.rstep + e.totsamp,
                  e.routbuf,
                  e.rout + e.totsamp,
                  g,
                  n[e.reqindex]
                ),
                (b = e.lout + e.totsamp),
                (m = e.loutbuf),
                (p = e.rout + e.totsamp),
                (d = e.routbuf);
              for (var M = g % 8; 0 != M--; )
                (e.lsum += l(m[b++])), (e.rsum += l(d[p++]));
              for (M = g / 8; 0 != M--; )
                (e.lsum +=
                  l(m[b + 0]) +
                  l(m[b + 1]) +
                  l(m[b + 2]) +
                  l(m[b + 3]) +
                  l(m[b + 4]) +
                  l(m[b + 5]) +
                  l(m[b + 6]) +
                  l(m[b + 7])),
                  (b += 8),
                  (e.rsum +=
                    l(d[p + 0]) +
                    l(d[p + 1]) +
                    l(d[p + 2]) +
                    l(d[p + 3]) +
                    l(d[p + 4]) +
                    l(d[p + 5]) +
                    l(d[p + 6]) +
                    l(d[p + 7])),
                  (p += 8);
              if (
                ((v -= g),
                (S += g),
                (e.totsamp += g),
                e.totsamp == e.sampleWindow)
              ) {
                var w =
                    10 *
                    _.STEPS_per_dB *
                    Math.log10(((e.lsum + e.rsum) / e.totsamp) * 0.5 + 1e-37),
                  A = w <= 0 ? 0 : 0 | w;
                A >= e.A.length && (A = e.A.length - 1),
                  e.A[A]++,
                  (e.lsum = e.rsum = 0),
                  s.arraycopy(e.loutbuf, e.totsamp, e.loutbuf, 0, MAX_ORDER),
                  s.arraycopy(e.routbuf, e.totsamp, e.routbuf, 0, MAX_ORDER),
                  s.arraycopy(e.lstepbuf, e.totsamp, e.lstepbuf, 0, MAX_ORDER),
                  s.arraycopy(e.rstepbuf, e.totsamp, e.rstepbuf, 0, MAX_ORDER),
                  (e.totsamp = 0);
              }
              if (e.totsamp > e.sampleWindow) return GAIN_ANALYSIS_ERROR;
            }
            return (
              u < MAX_ORDER
                ? (s.arraycopy(e.linprebuf, u, e.linprebuf, 0, MAX_ORDER - u),
                  s.arraycopy(e.rinprebuf, u, e.rinprebuf, 0, MAX_ORDER - u),
                  s.arraycopy(t, r, e.linprebuf, MAX_ORDER - u, u),
                  s.arraycopy(f, c, e.rinprebuf, MAX_ORDER - u, u))
                : (s.arraycopy(t, r + u - MAX_ORDER, e.linprebuf, 0, MAX_ORDER),
                  s.arraycopy(f, c + u - MAX_ORDER, e.rinprebuf, 0, MAX_ORDER)),
              GAIN_ANALYSIS_OK
            );
          }),
          (this.GetTitleGain = function (e) {
            for (
              var t = (function (e, t) {
                  var a,
                    n = 0;
                  for (a = 0; a < t; a++) n += e[a];
                  if (0 == n) return GAIN_NOT_ENOUGH_SAMPLES;
                  var s = 0 | Math.ceil(n * (1 - 0.95));
                  for (a = t; a-- > 0 && !((s -= e[a]) <= 0); );
                  return 64.82 - a / _.STEPS_per_dB;
                })(e.A, e.A.length),
                a = 0;
              a < e.A.length;
              a++
            )
              (e.B[a] += e.A[a]), (e.A[a] = 0);
            for (a = 0; a < MAX_ORDER; a++)
              e.linprebuf[a] = e.lstepbuf[a] = e.loutbuf[a] = e.rinprebuf[
                a
              ] = e.rstepbuf[a] = e.routbuf[a] = 0;
            return (e.totsamp = 0), (e.lsum = e.rsum = 0), t;
          });
      }
      (_.STEPS_per_dB = 100),
        (_.MAX_dB = 120),
        (_.GAIN_NOT_ENOUGH_SAMPLES = -24601),
        (_.GAIN_ANALYSIS_ERROR = 0),
        (_.GAIN_ANALYSIS_OK = 1),
        (_.INIT_GAIN_ANALYSIS_ERROR = 0),
        (_.INIT_GAIN_ANALYSIS_OK = 1),
        (_.YULE_ORDER = 10),
        (_.MAX_ORDER = _.YULE_ORDER),
        (_.MAX_SAMP_FREQ = 48e3),
        (_.RMS_WINDOW_TIME_NUMERATOR = 1),
        (_.RMS_WINDOW_TIME_DENOMINATOR = 20),
        (_.MAX_SAMPLES_PER_WINDOW =
          (_.MAX_SAMP_FREQ * _.RMS_WINDOW_TIME_NUMERATOR) /
            _.RMS_WINDOW_TIME_DENOMINATOR +
          1),
        (e.exports = _);
    },
    function (e, t) {
      e.exports = function (e) {
        this.bits = e;
      };
    },
    function (e, t, a) {
      var n = a(0),
        s = n.System,
        r = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays),
        _ = (n.new_array_n, n.new_byte),
        i = (n.new_double, n.new_float, n.new_float_n),
        o = n.new_int,
        l = (n.new_int_n, n.assert),
        f = a(12),
        c = a(5),
        u = a(1),
        h = a(2);
      function b() {
        var e = this,
          t = null,
          a = null,
          n = null,
          b = null;
        this.setModules = function (e, s, r, _) {
          (t = e), (a = s), (n = r), (b = _);
        };
        var m = null,
          p = 0,
          d = 0,
          v = 0;
        function g(e) {
          s.arraycopy(e.header[e.w_ptr].buf, 0, m, d, e.sideinfo_len),
            (d += e.sideinfo_len),
            (p += 8 * e.sideinfo_len),
            (e.w_ptr = (e.w_ptr + 1) & (h.MAX_HEADER_BUF - 1));
        }
        function S(e, t, a) {
          for (l(a < 30); a > 0; ) {
            var n;
            0 == v &&
              ((v = 8),
              d++,
              l(d < Lame.LAME_MAXMP3BUFFER),
              l(e.header[e.w_ptr].write_timing >= p),
              e.header[e.w_ptr].write_timing == p && g(e),
              (m[d] = 0)),
              (n = Math.min(a, v)),
              (v -= n),
              l((a -= n) < 32),
              l(v < 32),
              (m[d] |= (t >> a) << v),
              (p += n);
          }
        }
        function M(e, t, a) {
          for (l(a < 30); a > 0; ) {
            var n;
            0 == v && ((v = 8), d++, l(d < Lame.LAME_MAXMP3BUFFER), (m[d] = 0)),
              (n = Math.min(a, v)),
              (v -= n),
              l((a -= n) < 32),
              l(v < 32),
              (m[d] |= (t >> a) << v),
              (p += n);
          }
        }
        function w(e, t) {
          var a,
            s = e.internal_flags;
          if (
            (l(t >= 0),
            t >= 8 && (S(s, 76, 8), (t -= 8)),
            t >= 8 && (S(s, 65, 8), (t -= 8)),
            t >= 8 && (S(s, 77, 8), (t -= 8)),
            t >= 8 && (S(s, 69, 8), (t -= 8)),
            t >= 32)
          ) {
            var r = n.getLameShortVersion();
            if (t >= 32)
              for (a = 0; a < r.length && t >= 8; ++a)
                (t -= 8), S(s, r.charAt(a), 8);
          }
          for (; t >= 1; t -= 1)
            S(s, s.ancillary_flag, 1),
              (s.ancillary_flag ^= e.disable_reservoir ? 0 : 1);
          l(0 == t);
        }
        function A(e, t, a) {
          for (var n = e.header[e.h_ptr].ptr; a > 0; ) {
            var s = Math.min(a, 8 - (7 & n));
            l((a -= s) < 32),
              (e.header[e.h_ptr].buf[n >> 3] |= (t >> a) << (8 - (7 & n) - s)),
              (n += s);
          }
          e.header[e.h_ptr].ptr = n;
        }
        function R(e, t) {
          e <<= 8;
          for (var a = 0; a < 8; a++)
            0 != (65536 & ((t <<= 1) ^ (e <<= 1))) && (t ^= 32773);
          return t;
        }
        function B(e, t) {
          var a,
            n = c.ht[t.count1table_select + 32],
            s = 0,
            r = t.big_values,
            _ = t.big_values;
          for (
            l(t.count1table_select < 2), a = (t.count1 - t.big_values) / 4;
            a > 0;
            --a
          ) {
            var i,
              o = 0,
              f = 0;
            0 != (i = t.l3_enc[r + 0]) &&
              ((f += 8), t.xr[_ + 0] < 0 && o++, l(i <= 1)),
              0 != (i = t.l3_enc[r + 1]) &&
                ((f += 4), (o *= 2), t.xr[_ + 1] < 0 && o++, l(i <= 1)),
              0 != (i = t.l3_enc[r + 2]) &&
                ((f += 2), (o *= 2), t.xr[_ + 2] < 0 && o++, l(i <= 1)),
              0 != (i = t.l3_enc[r + 3]) &&
                (f++, (o *= 2), t.xr[_ + 3] < 0 && o++, l(i <= 1)),
              (r += 4),
              (_ += 4),
              S(e, o + n.table[f], n.hlen[f]),
              (s += n.hlen[f]);
          }
          return s;
        }
        function y(e, t, a, n, s) {
          var r = c.ht[t],
            _ = 0;
          if ((l(t < 32), 0 == t)) return _;
          for (var i = a; i < n; i += 2) {
            var o = 0,
              f = 0,
              u = r.xlen,
              h = r.xlen,
              b = 0,
              m = s.l3_enc[i],
              p = s.l3_enc[i + 1];
            if ((0 != m && (s.xr[i] < 0 && b++, o--), t > 15)) {
              if (m > 14) {
                var d = m - 15;
                l(d <= r.linmax), (b |= d << 1), (f = u), (m = 15);
              }
              if (p > 14) {
                var v = p - 15;
                l(v <= r.linmax), (b <<= u), (b |= v), (f += u), (p = 15);
              }
              h = 16;
            }
            0 != p && ((b <<= 1), s.xr[i + 1] < 0 && b++, o--),
              l((m | p) < 16),
              (m = m * h + p),
              (f -= o),
              (o += r.hlen[m]),
              l(o <= 32),
              l(f <= 32),
              S(e, r.table[m], o),
              S(e, b, f),
              (_ += o + f);
          }
          return _;
        }
        function E(e, t) {
          var a = 3 * e.scalefac_band.s[3];
          a > t.big_values && (a = t.big_values);
          var n = y(e, t.table_select[0], 0, a, t);
          return (n += y(e, t.table_select[1], a, t.big_values, t));
        }
        function T(e, t) {
          var a, n, s, r;
          (a = t.big_values), l(0 <= a && a <= 576);
          var _ = t.region0_count + 1;
          return (
            l(0 <= _),
            l(_ < e.scalefac_band.l.length),
            (s = e.scalefac_band.l[_]),
            (_ += t.region1_count + 1),
            l(0 <= _),
            l(_ < e.scalefac_band.l.length),
            s > a && (s = a),
            (r = e.scalefac_band.l[_]) > a && (r = a),
            (n = y(e, t.table_select[0], 0, s, t)),
            (n += y(e, t.table_select[1], s, r, t)),
            (n += y(e, t.table_select[2], r, a, t))
          );
        }
        function x() {
          this.total = 0;
        }
        function k(t, a) {
          var n,
            r,
            _,
            i,
            o,
            l = t.internal_flags;
          return (
            (o = l.w_ptr),
            -1 == (i = l.h_ptr - 1) && (i = h.MAX_HEADER_BUF - 1),
            (n = l.header[i].write_timing - p),
            (a.total = n),
            n >= 0 &&
              ((r = 1 + i - o),
              i < o && (r = 1 + i - o + h.MAX_HEADER_BUF),
              (n -= 8 * r * l.sideinfo_len)),
            (n += _ = e.getframebits(t)),
            (a.total += _),
            a.total % 8 != 0
              ? (a.total = 1 + a.total / 8)
              : (a.total = a.total / 8),
            (a.total += d + 1),
            n < 0 && s.err.println('strange error flushing buffer ... \n'),
            n
          );
        }
        (this.getframebits = function (e) {
          var t,
            a = e.internal_flags;
          return (
            (t =
              0 != a.bitrate_index
                ? c.bitrate_table[e.version][a.bitrate_index]
                : e.brate),
            l(8 <= t && t <= 640),
            8 *
              (0 |
                ((72e3 * (e.version + 1) * t) / e.out_samplerate + a.padding))
          );
        }),
          (this.CRC_writeheader = function (e, t) {
            var a = 65535;
            (a = R(255 & t[2], a)), (a = R(255 & t[3], a));
            for (var n = 6; n < e.sideinfo_len; n++) a = R(255 & t[n], a);
            (t[4] = byte(a >> 8)), (t[5] = byte(255 & a));
          }),
          (this.flush_bitstream = function (e) {
            var a,
              n,
              s = e.internal_flags,
              r = s.h_ptr - 1;
            if (
              (-1 == r && (r = h.MAX_HEADER_BUF - 1),
              (a = s.l3_side),
              !((n = k(e, new x())) < 0))
            ) {
              if (
                (w(e, n),
                l(s.header[r].write_timing + this.getframebits(e) == p),
                (s.ResvSize = 0),
                (a.main_data_begin = 0),
                s.findReplayGain)
              ) {
                var _ = t.GetTitleGain(s.rgdata);
                l(NEQ(_, GainAnalysis.GAIN_NOT_ENOUGH_SAMPLES)),
                  (s.RadioGain = 0 | Math.floor(10 * _ + 0.5));
              }
              s.findPeakSample &&
                ((s.noclipGainChange =
                  0 | Math.ceil(20 * Math.log10(s.PeakSample / 32767) * 10)),
                s.noclipGainChange > 0 && (EQ(e.scale, 1) || EQ(e.scale, 0))
                  ? (s.noclipScale =
                      Math.floor((32767 / s.PeakSample) * 100) / 100)
                  : (s.noclipScale = -1));
            }
          }),
          (this.add_dummy_byte = function (e, t, a) {
            for (var n, s = e.internal_flags; a-- > 0; )
              for (M(0, t, 8), n = 0; n < h.MAX_HEADER_BUF; ++n)
                s.header[n].write_timing += 8;
          }),
          (this.format_bitstream = function (e) {
            var t,
              a = e.internal_flags;
            t = a.l3_side;
            var n = this.getframebits(e);
            w(e, t.resvDrain_pre),
              (function (e, t) {
                var a,
                  n,
                  _,
                  i = e.internal_flags;
                if (
                  ((a = i.l3_side),
                  (i.header[i.h_ptr].ptr = 0),
                  r.fill(i.header[i.h_ptr].buf, 0, i.sideinfo_len, 0),
                  e.out_samplerate < 16e3 ? A(i, 4094, 12) : A(i, 4095, 12),
                  A(i, e.version, 1),
                  A(i, 1, 2),
                  A(i, e.error_protection ? 0 : 1, 1),
                  A(i, i.bitrate_index, 4),
                  A(i, i.samplerate_index, 2),
                  A(i, i.padding, 1),
                  A(i, e.extension, 1),
                  A(i, e.mode.ordinal(), 2),
                  A(i, i.mode_ext, 2),
                  A(i, e.copyright, 1),
                  A(i, e.original, 1),
                  A(i, e.emphasis, 2),
                  e.error_protection && A(i, 0, 16),
                  1 == e.version)
                ) {
                  for (
                    l(a.main_data_begin >= 0),
                      A(i, a.main_data_begin, 9),
                      2 == i.channels_out
                        ? A(i, a.private_bits, 3)
                        : A(i, a.private_bits, 5),
                      _ = 0;
                    _ < i.channels_out;
                    _++
                  ) {
                    var o;
                    for (o = 0; o < 4; o++) A(i, a.scfsi[_][o], 1);
                  }
                  for (n = 0; n < 2; n++)
                    for (_ = 0; _ < i.channels_out; _++) {
                      A(
                        i,
                        (f = a.tt[n][_]).part2_3_length + f.part2_length,
                        12
                      ),
                        A(i, f.big_values / 2, 9),
                        A(i, f.global_gain, 8),
                        A(i, f.scalefac_compress, 4),
                        f.block_type != u.NORM_TYPE
                          ? (A(i, 1, 1),
                            A(i, f.block_type, 2),
                            A(i, f.mixed_block_flag, 1),
                            14 == f.table_select[0] && (f.table_select[0] = 16),
                            A(i, f.table_select[0], 5),
                            14 == f.table_select[1] && (f.table_select[1] = 16),
                            A(i, f.table_select[1], 5),
                            A(i, f.subblock_gain[0], 3),
                            A(i, f.subblock_gain[1], 3),
                            A(i, f.subblock_gain[2], 3))
                          : (A(i, 0, 1),
                            14 == f.table_select[0] && (f.table_select[0] = 16),
                            A(i, f.table_select[0], 5),
                            14 == f.table_select[1] && (f.table_select[1] = 16),
                            A(i, f.table_select[1], 5),
                            14 == f.table_select[2] && (f.table_select[2] = 16),
                            A(i, f.table_select[2], 5),
                            l(0 <= f.region0_count && f.region0_count < 16),
                            l(0 <= f.region1_count && f.region1_count < 8),
                            A(i, f.region0_count, 4),
                            A(i, f.region1_count, 3)),
                        A(i, f.preflag, 1),
                        A(i, f.scalefac_scale, 1),
                        A(i, f.count1table_select, 1);
                    }
                } else
                  for (
                    l(a.main_data_begin >= 0),
                      A(i, a.main_data_begin, 8),
                      A(i, a.private_bits, i.channels_out),
                      n = 0,
                      _ = 0;
                    _ < i.channels_out;
                    _++
                  ) {
                    var f;
                    A(i, (f = a.tt[n][_]).part2_3_length + f.part2_length, 12),
                      A(i, f.big_values / 2, 9),
                      A(i, f.global_gain, 8),
                      A(i, f.scalefac_compress, 9),
                      f.block_type != u.NORM_TYPE
                        ? (A(i, 1, 1),
                          A(i, f.block_type, 2),
                          A(i, f.mixed_block_flag, 1),
                          14 == f.table_select[0] && (f.table_select[0] = 16),
                          A(i, f.table_select[0], 5),
                          14 == f.table_select[1] && (f.table_select[1] = 16),
                          A(i, f.table_select[1], 5),
                          A(i, f.subblock_gain[0], 3),
                          A(i, f.subblock_gain[1], 3),
                          A(i, f.subblock_gain[2], 3))
                        : (A(i, 0, 1),
                          14 == f.table_select[0] && (f.table_select[0] = 16),
                          A(i, f.table_select[0], 5),
                          14 == f.table_select[1] && (f.table_select[1] = 16),
                          A(i, f.table_select[1], 5),
                          14 == f.table_select[2] && (f.table_select[2] = 16),
                          A(i, f.table_select[2], 5),
                          l(0 <= f.region0_count && f.region0_count < 16),
                          l(0 <= f.region1_count && f.region1_count < 8),
                          A(i, f.region0_count, 4),
                          A(i, f.region1_count, 3)),
                      A(i, f.scalefac_scale, 1),
                      A(i, f.count1table_select, 1);
                  }
                e.error_protection && CRC_writeheader(i, i.header[i.h_ptr].buf);
                var c = i.h_ptr;
                l(i.header[c].ptr == 8 * i.sideinfo_len),
                  (i.h_ptr = (c + 1) & (h.MAX_HEADER_BUF - 1)),
                  (i.header[i.h_ptr].write_timing =
                    i.header[c].write_timing + t),
                  i.h_ptr == i.w_ptr &&
                    s.err.println(
                      'Error: MAX_HEADER_BUF too small in bitstream.c \n'
                    );
              })(e, n);
            var _ = 8 * a.sideinfo_len;
            if (
              ((_ += (function (e) {
                var t,
                  a,
                  n,
                  s,
                  r = 0,
                  _ = e.internal_flags,
                  i = _.l3_side;
                if (1 == e.version)
                  for (t = 0; t < 2; t++)
                    for (a = 0; a < _.channels_out; a++) {
                      var o = i.tt[t][a],
                        c = f.slen1_tab[o.scalefac_compress],
                        h = f.slen2_tab[o.scalefac_compress];
                      for (s = 0, n = 0; n < o.sfbdivide; n++)
                        -1 != o.scalefac[n] &&
                          (S(_, o.scalefac[n], c), (s += c));
                      for (; n < o.sfbmax; n++)
                        -1 != o.scalefac[n] &&
                          (S(_, o.scalefac[n], h), (s += h));
                      l(s == o.part2_length),
                        o.block_type == u.SHORT_TYPE
                          ? (s += E(_, o))
                          : (s += T(_, o)),
                        (s += B(_, o)),
                        l(s == o.part2_3_length + o.part2_length),
                        (r += s);
                    }
                else
                  for (t = 0, a = 0; a < _.channels_out; a++) {
                    o = i.tt[t][a];
                    var b,
                      m,
                      p = 0;
                    if (
                      (l(null != o.sfb_partition_table),
                      (s = 0),
                      (n = 0),
                      (m = 0),
                      o.block_type == u.SHORT_TYPE)
                    ) {
                      for (; m < 4; m++) {
                        var d = o.sfb_partition_table[m] / 3,
                          v = o.slen[m];
                        for (b = 0; b < d; b++, n++)
                          S(_, Math.max(o.scalefac[3 * n + 0], 0), v),
                            S(_, Math.max(o.scalefac[3 * n + 1], 0), v),
                            S(_, Math.max(o.scalefac[3 * n + 2], 0), v),
                            (p += 3 * v);
                      }
                      s += E(_, o);
                    } else {
                      for (; m < 4; m++) {
                        (d = o.sfb_partition_table[m]), (v = o.slen[m]);
                        for (b = 0; b < d; b++, n++)
                          S(_, Math.max(o.scalefac[n], 0), v), (p += v);
                      }
                      s += T(_, o);
                    }
                    (s += B(_, o)),
                      l(s == o.part2_3_length),
                      l(p == o.part2_length),
                      (r += p + s);
                  }
                return r;
              })(e)),
              w(e, t.resvDrain_post),
              (_ += t.resvDrain_post),
              (t.main_data_begin += (n - _) / 8),
              k(e, new x()) != a.ResvSize &&
                s.err.println(
                  'Internal buffer inconsistency. flushbits <> ResvSize'
                ),
              8 * t.main_data_begin != a.ResvSize &&
                (s.err.printf(
                  'bit reservoir error: \nl3_side.main_data_begin: %d \nResvoir size:             %d \nresv drain (post)         %d \nresv drain (pre)          %d \nheader and sideinfo:      %d \ndata bits:                %d \ntotal bits:               %d (remainder: %d) \nbitsperframe:             %d \n',
                  8 * t.main_data_begin,
                  a.ResvSize,
                  t.resvDrain_post,
                  t.resvDrain_pre,
                  8 * a.sideinfo_len,
                  _ - t.resvDrain_post - 8 * a.sideinfo_len,
                  _,
                  _ % 8,
                  n
                ),
                s.err.println(
                  'This is a fatal error.  It has several possible causes:'
                ),
                s.err.println(
                  '90%%  LAME compiled with buggy version of gcc using advanced optimizations'
                ),
                s.err.println(' 9%%  Your system is overclocked'),
                s.err.println(' 1%%  bug in LAME encoding library'),
                (a.ResvSize = 8 * t.main_data_begin)),
              l(p % 8 == 0),
              p > 1e9)
            ) {
              var i;
              for (i = 0; i < h.MAX_HEADER_BUF; ++i)
                a.header[i].write_timing -= p;
              p = 0;
            }
            return 0;
          }),
          (this.copy_buffer = function (e, n, r, _, f) {
            var c = d + 1;
            if (c <= 0) return 0;
            if (0 != _ && c > _) return -1;
            if ((s.arraycopy(m, 0, n, r, c), (d = -1), (v = 0), 0 != f)) {
              var u = o(1);
              if (
                ((u[0] = e.nMusicCRC),
                b.updateMusicCRC(u, n, r, c),
                (e.nMusicCRC = u[0]),
                c > 0 && (e.VBR_seek_table.nBytesWritten += c),
                e.decode_on_the_fly)
              )
                for (var h, p = i([2, 1152]), g = c, S = -1; 0 != S; )
                  if (
                    ((S = a.hip_decode1_unclipped(e.hip, n, r, g, p[0], p[1])),
                    (g = 0),
                    -1 == S && (S = 0),
                    S > 0)
                  ) {
                    if ((l(S <= 1152), e.findPeakSample)) {
                      for (h = 0; h < S; h++)
                        p[0][h] > e.PeakSample
                          ? (e.PeakSample = p[0][h])
                          : -p[0][h] > e.PeakSample &&
                            (e.PeakSample = -p[0][h]);
                      if (e.channels_out > 1)
                        for (h = 0; h < S; h++)
                          p[1][h] > e.PeakSample
                            ? (e.PeakSample = p[1][h])
                            : -p[1][h] > e.PeakSample &&
                              (e.PeakSample = -p[1][h]);
                    }
                    if (
                      e.findReplayGain &&
                      t.AnalyzeSamples(
                        e.rgdata,
                        p[0],
                        0,
                        p[1],
                        0,
                        S,
                        e.channels_out
                      ) == GainAnalysis.GAIN_ANALYSIS_ERROR
                    )
                      return -6;
                  }
            }
            return c;
          }),
          (this.init_bit_stream_w = function (e) {
            (m = _(Lame.LAME_MAXMP3BUFFER)),
              (e.h_ptr = e.w_ptr = 0),
              (e.header[e.h_ptr].write_timing = 0),
              (d = -1),
              (v = 0),
              (p = 0);
          });
      }
      (b.EQ = function (e, t) {
        return Math.abs(e) > Math.abs(t)
          ? Math.abs(e - t) <= 1e-6 * Math.abs(e)
          : Math.abs(e - t) <= 1e-6 * Math.abs(t);
      }),
        (b.NEQ = function (e, t) {
          return !b.EQ(e, t);
        }),
        (e.exports = b);
    },
    function (e, t, a) {
      var n = a(0),
        s = n.System,
        r = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays),
        _ =
          (n.new_array_n,
          n.new_byte,
          n.new_double,
          n.new_float,
          n.new_float_n,
          n.new_int),
        i = (n.new_int_n, n.assert),
        o = a(1),
        l = a(5),
        f = a(4),
        c = a(13);
      e.exports = function e() {
        var t = null;
        function a(e) {
          this.bits = 0 | e;
        }
        (this.qupvt = null),
          (this.setModules = function (e) {
            (this.qupvt = e), (t = e);
          });
        var n = [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 1],
          [1, 2],
          [2, 2],
          [2, 3],
          [2, 3],
          [3, 4],
          [3, 4],
          [3, 4],
          [4, 5],
          [4, 5],
          [4, 6],
          [5, 6],
          [5, 6],
          [5, 7],
          [6, 7],
          [6, 7],
        ];
        function u(e, t, a, n, s, r) {
          var _ = 0.5946 / t;
          for (i(e > 0), e >>= 1; 0 != e--; )
            (s[r++] = _ > a[n++] ? 0 : 1), (s[r++] = _ > a[n++] ? 0 : 1);
        }
        function h(e, a, n, s, r, _) {
          i(e > 0);
          var o = (e >>= 1) % 2;
          for (e >>= 1; 0 != e--; ) {
            var l, f, c, u, h, b, m, p;
            (l = n[s++] * a),
              (f = n[s++] * a),
              (h = 0 | l),
              (c = n[s++] * a),
              (b = 0 | f),
              (u = n[s++] * a),
              (m = 0 | c),
              (l += t.adj43[h]),
              (p = 0 | u),
              (f += t.adj43[b]),
              (r[_++] = 0 | l),
              (c += t.adj43[m]),
              (r[_++] = 0 | f),
              (u += t.adj43[p]),
              (r[_++] = 0 | c),
              (r[_++] = 0 | u);
          }
          0 != o &&
            ((h = 0 | (l = n[s++] * a)),
            (b = 0 | (f = n[s++] * a)),
            (l += t.adj43[h]),
            (f += t.adj43[b]),
            (r[_++] = 0 | l),
            (r[_++] = 0 | f));
        }
        var b = [1, 2, 5, 7, 7, 10, 10, 13, 13, 13, 13, 13, 13, 13, 13];
        function m(e, t, a, n) {
          var s = (function (e, t, a) {
            var n = 0,
              s = 0;
            do {
              var r = e[t++],
                _ = e[t++];
              n < r && (n = r), s < _ && (s = _);
            } while (t < a);
            return n < s && (n = s), n;
          })(e, t, a);
          switch (s) {
            case 0:
              return s;
            case 1:
              return (function (e, t, a, n) {
                var s = 0,
                  r = l.ht[1].hlen;
                do {
                  var _ = 2 * e[t + 0] + e[t + 1];
                  (t += 2), (s += r[_]);
                } while (t < a);
                return (n.bits += s), 1;
              })(e, t, a, n);
            case 2:
            case 3:
              return (function (e, t, a, n, s) {
                var r,
                  _,
                  i = 0,
                  o = l.ht[n].xlen;
                _ = 2 == n ? l.table23 : l.table56;
                do {
                  var f = e[t + 0] * o + e[t + 1];
                  (t += 2), (i += _[f]);
                } while (t < a);
                return (
                  (r = 65535 & i),
                  (i >>= 16) > r && ((i = r), n++),
                  (s.bits += i),
                  n
                );
              })(e, t, a, b[s - 1], n);
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
              return (function (e, t, a, n, s) {
                var r = 0,
                  _ = 0,
                  i = 0,
                  o = l.ht[n].xlen,
                  f = l.ht[n].hlen,
                  c = l.ht[n + 1].hlen,
                  u = l.ht[n + 2].hlen;
                do {
                  var h = e[t + 0] * o + e[t + 1];
                  (t += 2), (r += f[h]), (_ += c[h]), (i += u[h]);
                } while (t < a);
                var b = n;
                return (
                  r > _ && ((r = _), b++),
                  r > i && ((r = i), (b = n + 2)),
                  (s.bits += r),
                  b
                );
              })(e, t, a, b[s - 1], n);
            default:
              if (s > c.IXMAX_VAL) return (n.bits = c.LARGE_BITS), -1;
              var r, _;
              for (s -= 15, r = 24; r < 32 && !(l.ht[r].linmax >= s); r++);
              for (_ = r - 8; _ < 24 && !(l.ht[_].linmax >= s); _++);
              return (function (e, t, a, n, s, r) {
                var _,
                  i = 65536 * l.ht[n].xlen + l.ht[s].xlen,
                  o = 0;
                do {
                  var f = e[t++],
                    c = e[t++];
                  0 != f && (f > 14 && ((f = 15), (o += i)), (f *= 16)),
                    0 != c && (c > 14 && ((c = 15), (o += i)), (f += c)),
                    (o += l.largetbl[f]);
                } while (t < a);
                return (
                  (_ = 65535 & o),
                  (o >>= 16) > _ && ((o = _), (n = s)),
                  (r.bits += o),
                  n
                );
              })(e, t, a, _, r, n);
          }
        }
        function p(e, t, n, s, r, _, i, l) {
          for (var f = t.big_values, c = 2; c < o.SBMAX_l + 1; c++) {
            var u = e.scalefac_band.l[c];
            if (u >= f) break;
            var h = r[c - 2] + t.count1bits;
            if (n.part2_3_length <= h) break;
            var b = new a(h),
              p = m(s, u, f, b);
            (h = b.bits),
              n.part2_3_length <= h ||
                (n.assign(t),
                (n.part2_3_length = h),
                (n.region0_count = _[c - 2]),
                (n.region1_count = c - 2 - _[c - 2]),
                (n.table_select[0] = i[c - 2]),
                (n.table_select[1] = l[c - 2]),
                (n.table_select[2] = p));
          }
        }
        (this.noquant_count_bits = function (e, t, n) {
          var s = t.l3_enc,
            r = Math.min(576, ((t.max_nonzero_coeff + 2) >> 1) << 1);
          for (
            null != n && (n.sfb_count1 = 0);
            r > 1 && 0 == (s[r - 1] | s[r - 2]);
            r -= 2
          );
          t.count1 = r;
          for (var _ = 0, f = 0; r > 3; r -= 4) {
            var c;
            if ((2147483647 & (s[r - 1] | s[r - 2] | s[r - 3] | s[r - 4])) > 1)
              break;
            (c = 2 * (2 * (2 * s[r - 4] + s[r - 3]) + s[r - 2]) + s[r - 1]),
              (_ += l.t32l[c]),
              (f += l.t33l[c]);
          }
          var u = _;
          if (
            ((t.count1table_select = 0),
            _ > f && ((u = f), (t.count1table_select = 1)),
            (t.count1bits = u),
            (t.big_values = r),
            0 == r)
          )
            return u;
          if (t.block_type == o.SHORT_TYPE)
            (_ = 3 * e.scalefac_band.s[3]) > t.big_values && (_ = t.big_values),
              (f = t.big_values);
          else if (t.block_type == o.NORM_TYPE) {
            if (
              (i(r <= 576),
              (_ = t.region0_count = e.bv_scf[r - 2]),
              (f = t.region1_count = e.bv_scf[r - 1]),
              i(_ + f + 2 < o.SBPSY_l),
              (f = e.scalefac_band.l[_ + f + 2]),
              (_ = e.scalefac_band.l[_ + 1]),
              f < r)
            ) {
              var h = new a(u);
              (t.table_select[2] = m(s, f, r, h)), (u = h.bits);
            }
          } else
            (t.region0_count = 7),
              (t.region1_count = o.SBMAX_l - 1 - 7 - 1),
              (_ = e.scalefac_band.l[8]) > (f = r) && (_ = f);
          if (
            ((_ = Math.min(_, r)),
            (f = Math.min(f, r)),
            i(_ >= 0),
            i(f >= 0),
            0 < _)
          ) {
            h = new a(u);
            (t.table_select[0] = m(s, 0, _, h)), (u = h.bits);
          }
          if (_ < f) {
            h = new a(u);
            (t.table_select[1] = m(s, _, f, h)), (u = h.bits);
          }
          if (
            (2 == e.use_best_huffman &&
              ((t.part2_3_length = u),
              best_huffman_divide(e, t),
              (u = t.part2_3_length)),
            null != n && t.block_type == o.NORM_TYPE)
          ) {
            for (var b = 0; e.scalefac_band.l[b] < t.big_values; ) b++;
            n.sfb_count1 = b;
          }
          return u;
        }),
          (this.count_bits = function (e, a, n, s) {
            var _ = n.l3_enc,
              l = c.IXMAX_VAL / t.IPOW20(n.global_gain);
            if (n.xrpow_max > l) return c.LARGE_BITS;
            if (
              ((function (e, a, n, s, _) {
                var l,
                  f,
                  c,
                  b = 0,
                  m = 0,
                  p = 0,
                  d = 0,
                  v = a,
                  g = 0,
                  S = v,
                  M = 0,
                  w = e,
                  A = 0;
                for (
                  c = null != _ && s.global_gain == _.global_gain,
                    f = s.block_type == o.SHORT_TYPE ? 38 : 21,
                    l = 0;
                  l <= f;
                  l++
                ) {
                  var R = -1;
                  if (
                    ((c || s.block_type == o.NORM_TYPE) &&
                      (R =
                        s.global_gain -
                        ((s.scalefac[l] + (0 != s.preflag ? t.pretab[l] : 0)) <<
                          (s.scalefac_scale + 1)) -
                        8 * s.subblock_gain[s.window[l]]),
                    i(s.width[l] >= 0),
                    c && _.step[l] == R)
                  )
                    0 != m && (h(m, n, w, A, S, M), (m = 0)),
                      0 != p && (u(p, n, w, A, S, M), (p = 0));
                  else {
                    var B,
                      y = s.width[l];
                    if (b + s.width[l] > s.max_nonzero_coeff)
                      (B = s.max_nonzero_coeff - b + 1),
                        r.fill(a, s.max_nonzero_coeff, 576, 0),
                        (y = B) < 0 && (y = 0),
                        (l = f + 1);
                    if (
                      (0 == m && 0 == p && ((S = v), (M = g), (w = e), (A = d)),
                      null != _ &&
                      _.sfb_count1 > 0 &&
                      l >= _.sfb_count1 &&
                      _.step[l] > 0 &&
                      R >= _.step[l]
                        ? (0 != m &&
                            (h(m, n, w, A, S, M),
                            (m = 0),
                            (S = v),
                            (M = g),
                            (w = e),
                            (A = d)),
                          (p += y))
                        : (0 != p &&
                            (u(p, n, w, A, S, M),
                            (p = 0),
                            (S = v),
                            (M = g),
                            (w = e),
                            (A = d)),
                          (m += y)),
                      y <= 0)
                    ) {
                      0 != p && (u(p, n, w, A, S, M), (p = 0)),
                        0 != m && (h(m, n, w, A, S, M), (m = 0));
                      break;
                    }
                  }
                  l <= f &&
                    ((g += s.width[l]), (d += s.width[l]), (b += s.width[l]));
                }
                0 != m && (h(m, n, w, A, S, M), (m = 0)),
                  0 != p && (u(p, n, w, A, S, M), (p = 0));
              })(a, _, t.IPOW20(n.global_gain), n, s),
              0 != (2 & e.substep_shaping))
            )
              for (
                var f = 0,
                  b = n.global_gain + n.scalefac_scale,
                  m = 0.634521682242439 / t.IPOW20(b),
                  p = 0;
                p < n.sfbmax;
                p++
              ) {
                var d,
                  v = n.width[p];
                if ((i(v >= 0), 0 == e.pseudohalf[p])) f += v;
                else
                  for (d = f, f += v; d < f; ++d) _[d] = a[d] >= m ? _[d] : 0;
              }
            return this.noquant_count_bits(e, n, s);
          }),
          (this.best_huffman_divide = function (e, t) {
            var n = new f(),
              s = t.l3_enc,
              r = _(23),
              u = _(23),
              h = _(23),
              b = _(23);
            if (t.block_type != o.SHORT_TYPE || 1 != e.mode_gr) {
              n.assign(t),
                t.block_type == o.NORM_TYPE &&
                  (!(function (e, t, n, s, r, _, i) {
                    for (var o = t.big_values, l = 0; l <= 22; l++)
                      s[l] = c.LARGE_BITS;
                    for (l = 0; l < 16; l++) {
                      var f = e.scalefac_band.l[l + 1];
                      if (f >= o) break;
                      var u = 0,
                        h = new a(u),
                        b = m(n, 0, f, h);
                      u = h.bits;
                      for (var p = 0; p < 8; p++) {
                        var d = e.scalefac_band.l[l + p + 2];
                        if (d >= o) break;
                        var v = u,
                          g = m(n, f, d, (h = new a(v)));
                        (v = h.bits),
                          s[l + p] > v &&
                            ((s[l + p] = v),
                            (r[l + p] = l),
                            (_[l + p] = b),
                            (i[l + p] = g));
                      }
                    }
                  })(e, t, s, r, u, h, b),
                  p(e, n, t, s, r, u, h, b));
              var d = n.big_values;
              if (
                !(
                  0 == d ||
                  (s[d - 2] | s[d - 1]) > 1 ||
                  (d = t.count1 + 2) > 576
                )
              ) {
                n.assign(t), (n.count1 = d);
                var v = 0,
                  g = 0;
                for (i(d <= 576); d > n.big_values; d -= 4) {
                  var S =
                    2 * (2 * (2 * s[d - 4] + s[d - 3]) + s[d - 2]) + s[d - 1];
                  (v += l.t32l[S]), (g += l.t33l[S]);
                }
                if (
                  ((n.big_values = d),
                  (n.count1table_select = 0),
                  v > g && ((v = g), (n.count1table_select = 1)),
                  (n.count1bits = v),
                  n.block_type == o.NORM_TYPE)
                )
                  p(e, n, t, s, r, u, h, b);
                else {
                  if (
                    ((n.part2_3_length = v),
                    (v = e.scalefac_band.l[8]) > d && (v = d),
                    v > 0)
                  ) {
                    var M = new a(n.part2_3_length);
                    (n.table_select[0] = m(s, 0, v, M)),
                      (n.part2_3_length = M.bits);
                  }
                  if (d > v) {
                    M = new a(n.part2_3_length);
                    (n.table_select[1] = m(s, v, d, M)),
                      (n.part2_3_length = M.bits);
                  }
                  t.part2_3_length > n.part2_3_length && t.assign(n);
                }
              }
            }
          });
        var d = [1, 1, 1, 1, 8, 2, 2, 2, 4, 4, 4, 8, 8, 8, 16, 16],
          v = [1, 2, 4, 8, 1, 2, 4, 8, 2, 4, 8, 2, 4, 8, 4, 8],
          g = [0, 0, 0, 0, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4],
          S = [0, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 3];
        (e.slen1_tab = g),
          (e.slen2_tab = S),
          (this.best_scalefac_store = function (e, a, n, s) {
            var r,
              _,
              f,
              c,
              u = s.tt[a][n],
              h = 0;
            for (f = 0, r = 0; r < u.sfbmax; r++) {
              var b = u.width[r];
              for (
                i(b >= 0), f += b, c = -b;
                c < 0 && 0 == u.l3_enc[c + f];
                c++
              );
              0 == c && (u.scalefac[r] = h = -2);
            }
            if (0 == u.scalefac_scale && 0 == u.preflag) {
              var m = 0;
              for (r = 0; r < u.sfbmax; r++)
                u.scalefac[r] > 0 && (m |= u.scalefac[r]);
              if (0 == (1 & m) && 0 != m) {
                for (r = 0; r < u.sfbmax; r++)
                  u.scalefac[r] > 0 && (u.scalefac[r] >>= 1);
                u.scalefac_scale = h = 1;
              }
            }
            if (
              0 == u.preflag &&
              u.block_type != o.SHORT_TYPE &&
              2 == e.mode_gr
            ) {
              for (
                r = 11;
                r < o.SBPSY_l &&
                !(u.scalefac[r] < t.pretab[r] && -2 != u.scalefac[r]);
                r++
              );
              if (r == o.SBPSY_l) {
                for (r = 11; r < o.SBPSY_l; r++)
                  u.scalefac[r] > 0 && (u.scalefac[r] -= t.pretab[r]);
                u.preflag = h = 1;
              }
            }
            for (_ = 0; _ < 4; _++) s.scfsi[n][_] = 0;
            for (
              2 == e.mode_gr &&
                1 == a &&
                s.tt[0][n].block_type != o.SHORT_TYPE &&
                s.tt[1][n].block_type != o.SHORT_TYPE &&
                (!(function (e, t) {
                  for (
                    var a, n = t.tt[1][e], s = t.tt[0][e], r = 0;
                    r < l.scfsi_band.length - 1;
                    r++
                  ) {
                    for (
                      a = l.scfsi_band[r];
                      a < l.scfsi_band[r + 1] &&
                      !(s.scalefac[a] != n.scalefac[a] && n.scalefac[a] >= 0);
                      a++
                    );
                    if (a == l.scfsi_band[r + 1]) {
                      for (a = l.scfsi_band[r]; a < l.scfsi_band[r + 1]; a++)
                        n.scalefac[a] = -1;
                      t.scfsi[e][r] = 1;
                    }
                  }
                  var _ = 0,
                    i = 0;
                  for (a = 0; a < 11; a++)
                    -1 != n.scalefac[a] &&
                      (i++, _ < n.scalefac[a] && (_ = n.scalefac[a]));
                  for (var f = 0, c = 0; a < o.SBPSY_l; a++)
                    -1 != n.scalefac[a] &&
                      (c++, f < n.scalefac[a] && (f = n.scalefac[a]));
                  for (r = 0; r < 16; r++)
                    if (_ < d[r] && f < v[r]) {
                      var u = g[r] * i + S[r] * c;
                      n.part2_length > u &&
                        ((n.part2_length = u), (n.scalefac_compress = r));
                    }
                })(n, s),
                (h = 0)),
                r = 0;
              r < u.sfbmax;
              r++
            )
              -2 == u.scalefac[r] && (u.scalefac[r] = 0);
            0 != h &&
              (2 == e.mode_gr
                ? this.scale_bitcount(u)
                : this.scale_bitcount_lsf(e, u));
          });
        var M = [
            0,
            18,
            36,
            54,
            54,
            36,
            54,
            72,
            54,
            72,
            90,
            72,
            90,
            108,
            108,
            126,
          ],
          w = [
            0,
            18,
            36,
            54,
            51,
            35,
            53,
            71,
            52,
            70,
            88,
            69,
            87,
            105,
            104,
            122,
          ],
          A = [0, 10, 20, 30, 33, 21, 31, 41, 32, 42, 52, 43, 53, 63, 64, 74];
        this.scale_bitcount = function (e) {
          var a,
            n,
            s,
            r = 0,
            _ = 0,
            l = e.scalefac;
          if (
            (i(
              (function (e, t) {
                for (var a = 0; a < t; ++a) if (e[a] < 0) return !1;
                return !0;
              })(l, e.sfbmax)
            ),
            e.block_type == o.SHORT_TYPE)
          )
            (s = M), 0 != e.mixed_block_flag && (s = w);
          else if (((s = A), 0 == e.preflag)) {
            for (n = 11; n < o.SBPSY_l && !(l[n] < t.pretab[n]); n++);
            if (n == o.SBPSY_l)
              for (e.preflag = 1, n = 11; n < o.SBPSY_l; n++)
                l[n] -= t.pretab[n];
          }
          for (n = 0; n < e.sfbdivide; n++) r < l[n] && (r = l[n]);
          for (; n < e.sfbmax; n++) _ < l[n] && (_ = l[n]);
          for (e.part2_length = c.LARGE_BITS, a = 0; a < 16; a++)
            r < d[a] &&
              _ < v[a] &&
              e.part2_length > s[a] &&
              ((e.part2_length = s[a]), (e.scalefac_compress = a));
          return e.part2_length == c.LARGE_BITS;
        };
        var R = [
          [15, 15, 7, 7],
          [15, 15, 7, 0],
          [7, 3, 0, 0],
          [15, 31, 31, 0],
          [7, 7, 7, 0],
          [3, 3, 0, 0],
        ];
        this.scale_bitcount_lsf = function (e, a) {
          var n,
            r,
            l,
            f,
            c,
            u,
            h,
            b,
            m = _(4),
            p = a.scalefac;
          for (n = 0 != a.preflag ? 2 : 0, h = 0; h < 4; h++) m[h] = 0;
          if (a.block_type == o.SHORT_TYPE) {
            r = 1;
            var d = t.nr_of_sfb_block[n][r];
            for (b = 0, l = 0; l < 4; l++)
              for (f = d[l] / 3, h = 0; h < f; h++, b++)
                for (c = 0; c < 3; c++)
                  p[3 * b + c] > m[l] && (m[l] = p[3 * b + c]);
          } else {
            r = 0;
            d = t.nr_of_sfb_block[n][r];
            for (b = 0, l = 0; l < 4; l++)
              for (f = d[l], h = 0; h < f; h++, b++)
                p[b] > m[l] && (m[l] = p[b]);
          }
          for (u = !1, l = 0; l < 4; l++) m[l] > R[n][l] && (u = !0);
          if (!u) {
            var v, g, S, M;
            for (
              a.sfb_partition_table = t.nr_of_sfb_block[n][r], l = 0;
              l < 4;
              l++
            )
              a.slen[l] = B[m[l]];
            switch (
              ((v = a.slen[0]),
              (g = a.slen[1]),
              (S = a.slen[2]),
              (M = a.slen[3]),
              n)
            ) {
              case 0:
                a.scalefac_compress = ((5 * v + g) << 4) + (S << 2) + M;
                break;
              case 1:
                a.scalefac_compress = 400 + ((5 * v + g) << 2) + S;
                break;
              case 2:
                a.scalefac_compress = 500 + 3 * v + g;
                break;
              default:
                s.err.printf('intensity stereo not implemented yet\n');
            }
          }
          if (!u)
            for (
              i(null != a.sfb_partition_table), a.part2_length = 0, l = 0;
              l < 4;
              l++
            )
              a.part2_length += a.slen[l] * a.sfb_partition_table[l];
          return u;
        };
        var B = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
        this.huffman_init = function (e) {
          for (var t = 2; t <= 576; t += 2) {
            for (var a, s = 0; e.scalefac_band.l[++s] < t; );
            for (a = n[s][0]; e.scalefac_band.l[a + 1] > t; ) a--;
            for (
              a < 0 && (a = n[s][0]), e.bv_scf[t - 2] = a, a = n[s][1];
              e.scalefac_band.l[a + e.bv_scf[t - 2] + 2] > t;

            )
              a--;
            a < 0 && (a = n[s][1]), (e.bv_scf[t - 1] = a);
          }
        };
      };
    },
    function (e, t, a) {
      var n = a(8),
        s = a(0),
        r = (s.System, s.VbrMode),
        _ = s.Float,
        i = (s.ShortBlock, s.Util),
        o = (s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float),
        l = (s.new_float_n, s.new_int),
        f = (s.new_int_n, s.assert),
        c = a(1),
        u = a(10),
        h = a(2);
      function b() {
        var e = null,
          t = null,
          a = null;
        (this.setModules = function (n, s, r) {
          (e = n), (t = s), (a = r);
        }),
          (this.IPOW20 = function (e) {
            return f(0 <= e && e < b.Q_MAX), g[e];
          });
        var s = b.IXMAX_VAL + 2,
          m = b.Q_MAX,
          p = b.Q_MAX2;
        b.LARGE_BITS;
        this.nr_of_sfb_block = [
          [
            [6, 5, 5, 5],
            [9, 9, 9, 9],
            [6, 9, 9, 9],
          ],
          [
            [6, 5, 7, 3],
            [9, 9, 12, 6],
            [6, 9, 12, 6],
          ],
          [
            [11, 10, 0, 0],
            [18, 18, 0, 0],
            [15, 18, 0, 0],
          ],
          [
            [7, 7, 7, 0],
            [12, 12, 12, 0],
            [6, 15, 12, 0],
          ],
          [
            [6, 6, 6, 3],
            [12, 9, 9, 6],
            [6, 12, 9, 6],
          ],
          [
            [8, 8, 5, 0],
            [15, 12, 9, 0],
            [6, 18, 9, 0],
          ],
        ];
        var d = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          2,
          2,
          3,
          3,
          3,
          2,
          0,
        ];
        (this.pretab = d),
          (this.sfBandIndex = [
            new n(
              [
                0,
                6,
                12,
                18,
                24,
                30,
                36,
                44,
                54,
                66,
                80,
                96,
                116,
                140,
                168,
                200,
                238,
                284,
                336,
                396,
                464,
                522,
                576,
              ],
              [0, 4, 8, 12, 18, 24, 32, 42, 56, 74, 100, 132, 174, 192],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]
            ),
            new n(
              [
                0,
                6,
                12,
                18,
                24,
                30,
                36,
                44,
                54,
                66,
                80,
                96,
                114,
                136,
                162,
                194,
                232,
                278,
                332,
                394,
                464,
                540,
                576,
              ],
              [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 136, 180, 192],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]
            ),
            new n(
              [
                0,
                6,
                12,
                18,
                24,
                30,
                36,
                44,
                54,
                66,
                80,
                96,
                116,
                140,
                168,
                200,
                238,
                284,
                336,
                396,
                464,
                522,
                576,
              ],
              [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]
            ),
            new n(
              [
                0,
                4,
                8,
                12,
                16,
                20,
                24,
                30,
                36,
                44,
                52,
                62,
                74,
                90,
                110,
                134,
                162,
                196,
                238,
                288,
                342,
                418,
                576,
              ],
              [0, 4, 8, 12, 16, 22, 30, 40, 52, 66, 84, 106, 136, 192],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]
            ),
            new n(
              [
                0,
                4,
                8,
                12,
                16,
                20,
                24,
                30,
                36,
                42,
                50,
                60,
                72,
                88,
                106,
                128,
                156,
                190,
                230,
                276,
                330,
                384,
                576,
              ],
              [0, 4, 8, 12, 16, 22, 28, 38, 50, 64, 80, 100, 126, 192],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]
            ),
            new n(
              [
                0,
                4,
                8,
                12,
                16,
                20,
                24,
                30,
                36,
                44,
                54,
                66,
                82,
                102,
                126,
                156,
                194,
                240,
                296,
                364,
                448,
                550,
                576,
              ],
              [0, 4, 8, 12, 16, 22, 30, 42, 58, 78, 104, 138, 180, 192],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]
            ),
            new n(
              [
                0,
                6,
                12,
                18,
                24,
                30,
                36,
                44,
                54,
                66,
                80,
                96,
                116,
                140,
                168,
                200,
                238,
                284,
                336,
                396,
                464,
                522,
                576,
              ],
              [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]
            ),
            new n(
              [
                0,
                6,
                12,
                18,
                24,
                30,
                36,
                44,
                54,
                66,
                80,
                96,
                116,
                140,
                168,
                200,
                238,
                284,
                336,
                396,
                464,
                522,
                576,
              ],
              [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]
            ),
            new n(
              [
                0,
                12,
                24,
                36,
                48,
                60,
                72,
                88,
                108,
                132,
                160,
                192,
                232,
                280,
                336,
                400,
                476,
                566,
                568,
                570,
                572,
                574,
                576,
              ],
              [0, 8, 16, 24, 36, 52, 72, 96, 124, 160, 162, 164, 166, 192],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]
            ),
          ]);
        var v = o(m + p + 1),
          g = o(m),
          S = o(s),
          M = o(s);
        function w(e, t) {
          var n = a.ATHformula(t, e);
          return (n -= 100), (n = Math.pow(10, n / 10 + e.ATHlower));
        }
        function A(e) {
          this.s = e;
        }
        (this.adj43 = M),
          (this.iteration_init = function (t) {
            var a,
              n = t.internal_flags,
              r = n.l3_side;
            if (0 == n.iteration_init_init) {
              for (
                n.iteration_init_init = 1,
                  r.main_data_begin = 0,
                  (function (e) {
                    for (
                      var t = e.internal_flags.ATH.l,
                        a = e.internal_flags.ATH.psfb21,
                        n = e.internal_flags.ATH.s,
                        s = e.internal_flags.ATH.psfb12,
                        r = e.internal_flags,
                        i = e.out_samplerate,
                        o = 0;
                      o < c.SBMAX_l;
                      o++
                    ) {
                      var l = r.scalefac_band.l[o],
                        f = r.scalefac_band.l[o + 1];
                      t[o] = _.MAX_VALUE;
                      for (var u = l; u < f; u++) {
                        var h = w(e, (u * i) / 1152);
                        t[o] = Math.min(t[o], h);
                      }
                    }
                    for (o = 0; o < c.PSFB21; o++) {
                      (l = r.scalefac_band.psfb21[o]),
                        (f = r.scalefac_band.psfb21[o + 1]);
                      a[o] = _.MAX_VALUE;
                      for (u = l; u < f; u++) {
                        h = w(e, (u * i) / 1152);
                        a[o] = Math.min(a[o], h);
                      }
                    }
                    for (o = 0; o < c.SBMAX_s; o++) {
                      (l = r.scalefac_band.s[o]),
                        (f = r.scalefac_band.s[o + 1]);
                      n[o] = _.MAX_VALUE;
                      for (u = l; u < f; u++) {
                        h = w(e, (u * i) / 384);
                        n[o] = Math.min(n[o], h);
                      }
                      n[o] *= r.scalefac_band.s[o + 1] - r.scalefac_band.s[o];
                    }
                    for (o = 0; o < c.PSFB12; o++) {
                      (l = r.scalefac_band.psfb12[o]),
                        (f = r.scalefac_band.psfb12[o + 1]);
                      s[o] = _.MAX_VALUE;
                      for (u = l; u < f; u++) {
                        h = w(e, (u * i) / 384);
                        s[o] = Math.min(s[o], h);
                      }
                      s[o] *= r.scalefac_band.s[13] - r.scalefac_band.s[12];
                    }
                    if (e.noATH) {
                      for (o = 0; o < c.SBMAX_l; o++) t[o] = 1e-20;
                      for (o = 0; o < c.PSFB21; o++) a[o] = 1e-20;
                      for (o = 0; o < c.SBMAX_s; o++) n[o] = 1e-20;
                      for (o = 0; o < c.PSFB12; o++) s[o] = 1e-20;
                    }
                    r.ATH.floor = 10 * Math.log10(w(e, -1));
                  })(t),
                  S[0] = 0,
                  a = 1;
                a < s;
                a++
              )
                S[a] = Math.pow(a, 4 / 3);
              for (a = 0; a < s - 1; a++)
                M[a] = a + 1 - Math.pow(0.5 * (S[a] + S[a + 1]), 0.75);
              for (M[a] = 0.5, a = 0; a < m; a++)
                g[a] = Math.pow(2, -0.1875 * (a - 210));
              for (a = 0; a <= m + p; a++)
                v[a] = Math.pow(2, 0.25 * (a - 210 - p));
              var i, o, l, f;
              for (
                e.huffman_init(n),
                  (a = (t.exp_nspsytune >> 2) & 63) >= 32 && (a -= 64),
                  i = Math.pow(10, a / 4 / 10),
                  (a = (t.exp_nspsytune >> 8) & 63) >= 32 && (a -= 64),
                  o = Math.pow(10, a / 4 / 10),
                  (a = (t.exp_nspsytune >> 14) & 63) >= 32 && (a -= 64),
                  l = Math.pow(10, a / 4 / 10),
                  (a = (t.exp_nspsytune >> 20) & 63) >= 32 && (a -= 64),
                  f = l * Math.pow(10, a / 4 / 10),
                  a = 0;
                a < c.SBMAX_l;
                a++
              ) {
                (u = a <= 6 ? i : a <= 13 ? o : a <= 20 ? l : f),
                  (n.nsPsy.longfact[a] = u);
              }
              for (a = 0; a < c.SBMAX_s; a++) {
                var u;
                (u = a <= 5 ? i : a <= 10 ? o : a <= 11 ? l : f),
                  (n.nsPsy.shortfact[a] = u);
              }
            }
          }),
          (this.on_pe = function (e, a, n, s, r, _) {
            var i,
              o,
              c = e.internal_flags,
              b = 0,
              m = l(2),
              p = new u(b),
              d = t.ResvMaxBits(e, s, p, _),
              v = (b = p.bits) + d;
            for (
              v > h.MAX_BITS_PER_GRANULE && (v = h.MAX_BITS_PER_GRANULE),
                i = 0,
                o = 0;
              o < c.channels_out;
              ++o
            )
              (n[o] = Math.min(h.MAX_BITS_PER_CHANNEL, b / c.channels_out)),
                (m[o] = 0 | ((n[o] * a[r][o]) / 700 - n[o])),
                m[o] > (3 * s) / 4 && (m[o] = (3 * s) / 4),
                m[o] < 0 && (m[o] = 0),
                m[o] + n[o] > h.MAX_BITS_PER_CHANNEL &&
                  (m[o] = Math.max(0, h.MAX_BITS_PER_CHANNEL - n[o])),
                (i += m[o]);
            if (i > d)
              for (o = 0; o < c.channels_out; ++o) m[o] = (d * m[o]) / i;
            for (o = 0; o < c.channels_out; ++o) (n[o] += m[o]), (d -= m[o]);
            for (i = 0, o = 0; o < c.channels_out; ++o) i += n[o];
            if (i > h.MAX_BITS_PER_GRANULE) {
              var g = 0;
              for (o = 0; o < c.channels_out; ++o)
                (n[o] *= h.MAX_BITS_PER_GRANULE), (n[o] /= i), (g += n[o]);
              f(g <= h.MAX_BITS_PER_GRANULE);
            }
            return v;
          }),
          (this.reduce_side = function (e, t, a, n) {
            f(n <= h.MAX_BITS_PER_GRANULE),
              f(e[0] + e[1] <= h.MAX_BITS_PER_GRANULE);
            var s = (0.33 * (0.5 - t)) / 0.5;
            s < 0 && (s = 0), s > 0.5 && (s = 0.5);
            var r = 0 | (0.5 * s * (e[0] + e[1]));
            r > h.MAX_BITS_PER_CHANNEL - e[0] &&
              (r = h.MAX_BITS_PER_CHANNEL - e[0]),
              r < 0 && (r = 0),
              e[1] >= 125 &&
                (e[1] - r > 125
                  ? (e[0] < a && (e[0] += r), (e[1] -= r))
                  : ((e[0] += e[1] - 125), (e[1] = 125))),
              (r = e[0] + e[1]) > n &&
                ((e[0] = (n * e[0]) / r), (e[1] = (n * e[1]) / r)),
              f(e[0] <= h.MAX_BITS_PER_CHANNEL),
              f(e[1] <= h.MAX_BITS_PER_CHANNEL),
              f(e[0] + e[1] <= h.MAX_BITS_PER_GRANULE);
          }),
          (this.athAdjust = function (e, t, a) {
            var n = 90.30873362,
              s = i.FAST_LOG10_X(t, 10),
              r = e * e,
              _ = 0;
            return (
              (s -= a),
              r > 1e-20 && (_ = 1 + i.FAST_LOG10_X(r, 10 / n)),
              _ < 0 && (_ = 0),
              (s *= _),
              (s += a + n - 94.82444863),
              Math.pow(10, 0.1 * s)
            );
          }),
          (this.calc_xmin = function (e, t, a, n) {
            var s,
              _ = 0,
              i = e.internal_flags,
              o = 0,
              l = 0,
              f = i.ATH,
              u = a.xr,
              h = e.VBR == r.vbr_mtrh ? 1 : 0,
              b = i.masking_lower;
            for (
              (e.VBR != r.vbr_mtrh && e.VBR != r.vbr_mt) || (b = 1), s = 0;
              s < a.psy_lmax;
              s++
            ) {
              (w =
                (M =
                  e.VBR == r.vbr_rh || e.VBR == r.vbr_mtrh
                    ? athAdjust(f.adjust, f.l[s], f.floor)
                    : f.adjust * f.l[s]) / (v = a.width[s])),
                (A = 2220446049250313e-31),
                (E = v >> 1),
                (y = 0);
              do {
                (y += T = u[o] * u[o]),
                  (A += T < w ? T : w),
                  (y += x = u[++o] * u[o]),
                  (A += x < w ? x : w),
                  o++;
              } while (--E > 0);
              if ((y > M && l++, s == c.SBPSY_l))
                A < (B = M * i.nsPsy.longfact[s]) && (A = B);
              if ((0 != h && (M = A), !e.ATHonly))
                if ((R = t.en.l[s]) > 0)
                  (B = (y * t.thm.l[s] * b) / R),
                    0 != h && (B *= i.nsPsy.longfact[s]),
                    M < B && (M = B);
              n[_++] = 0 != h ? M : M * i.nsPsy.longfact[s];
            }
            var m = 575;
            if (a.block_type != c.SHORT_TYPE)
              for (var p = 576; 0 != p-- && BitStream.EQ(u[p], 0); ) m = p;
            a.max_nonzero_coeff = m;
            for (var d = a.sfb_smin; s < a.psymax; d++, s += 3) {
              var v, g, S;
              for (
                S =
                  e.VBR == r.vbr_rh || e.VBR == r.vbr_mtrh
                    ? athAdjust(f.adjust, f.s[d], f.floor)
                    : f.adjust * f.s[d],
                  v = a.width[s],
                  g = 0;
                g < 3;
                g++
              ) {
                var M,
                  w,
                  A,
                  R,
                  B,
                  y = 0,
                  E = v >> 1;
                (w = S / v), (A = 2220446049250313e-31);
                do {
                  var T, x;
                  (y += T = u[o] * u[o]),
                    (A += T < w ? T : w),
                    (y += x = u[++o] * u[o]),
                    (A += x < w ? x : w),
                    o++;
                } while (--E > 0);
                if ((y > S && l++, d == c.SBPSY_s))
                  A < (B = S * i.nsPsy.shortfact[d]) && (A = B);
                if (((M = 0 != h ? A : S), !e.ATHonly && !e.ATHshort))
                  if ((R = t.en.s[d][g]) > 0)
                    (B = (y * t.thm.s[d][g] * b) / R),
                      0 != h && (B *= i.nsPsy.shortfact[d]),
                      M < B && (M = B);
                n[_++] = 0 != h ? M : M * i.nsPsy.shortfact[d];
              }
              e.useTemporal &&
                (n[_ - 3] > n[_ - 3 + 1] &&
                  (n[_ - 3 + 1] += (n[_ - 3] - n[_ - 3 + 1]) * i.decay),
                n[_ - 3 + 1] > n[_ - 3 + 2] &&
                  (n[_ - 3 + 2] += (n[_ - 3 + 1] - n[_ - 3 + 2]) * i.decay));
            }
            return l;
          }),
          (this.calc_noise_core = function (e, t, a, n) {
            var s = 0,
              r = t.s,
              _ = e.l3_enc;
            if (r > e.count1)
              for (; 0 != a--; ) {
                (l = e.xr[r]),
                  r++,
                  (s += l * l),
                  (l = e.xr[r]),
                  r++,
                  (s += l * l);
              }
            else if (r > e.big_values) {
              var i = o(2);
              for (i[0] = 0, i[1] = n; 0 != a--; ) {
                (l = Math.abs(e.xr[r]) - i[_[r]]),
                  r++,
                  (s += l * l),
                  (l = Math.abs(e.xr[r]) - i[_[r]]),
                  r++,
                  (s += l * l);
              }
            } else
              for (; 0 != a--; ) {
                var l;
                (l = Math.abs(e.xr[r]) - S[_[r]] * n),
                  r++,
                  (s += l * l),
                  (l = Math.abs(e.xr[r]) - S[_[r]] * n),
                  r++,
                  (s += l * l);
              }
            return (t.s = r), s;
          }),
          (this.calc_noise = function (e, t, a, n, s) {
            var r,
              _,
              o,
              l = 0,
              c = 0,
              u = 0,
              h = 0,
              m = 0,
              p = -20,
              g = 0,
              S = e.scalefac,
              M = 0;
            for (n.over_SSD = 0, r = 0; r < e.psymax; r++) {
              var w,
                R =
                  e.global_gain -
                  ((S[M++] + (0 != e.preflag ? d[r] : 0)) <<
                    (e.scalefac_scale + 1)) -
                  8 * e.subblock_gain[e.window[r]],
                B = 0;
              if (null != s && s.step[r] == R)
                (B = s.noise[r]),
                  (g += e.width[r]),
                  (a[l++] = B / t[c++]),
                  (B = s.noise_log[r]);
              else {
                var y,
                  E =
                    (f(0 <= (o = R) + b.Q_MAX2 && o < b.Q_MAX),
                    v[o + b.Q_MAX2]);
                if (
                  ((_ = e.width[r] >> 1), g + e.width[r] > e.max_nonzero_coeff)
                )
                  _ = (y = e.max_nonzero_coeff - g + 1) > 0 ? y >> 1 : 0;
                var T = new A(g);
                (B = this.calc_noise_core(e, T, _, E)),
                  (g = T.s),
                  null != s && ((s.step[r] = R), (s.noise[r] = B)),
                  (B = a[l++] = B / t[c++]),
                  (B = i.FAST_LOG10(Math.max(B, 1e-20))),
                  null != s && (s.noise_log[r] = B);
              }
              if (
                (null != s && (s.global_gain = e.global_gain), (m += B), B > 0)
              )
                (w = Math.max(0 | (10 * B + 0.5), 1)),
                  (n.over_SSD += w * w),
                  u++,
                  (h += B);
              p = Math.max(p, B);
            }
            return (
              (n.over_count = u),
              (n.tot_noise = m),
              (n.over_noise = h),
              (n.max_noise = p),
              u
            );
          }),
          (this.set_pinfo = function (e, t, a, n, s) {
            var r,
              _,
              i,
              l,
              u,
              h = e.internal_flags,
              b = 0 == t.scalefac_scale ? 0.5 : 1,
              m = t.scalefac,
              p = o(L3Side.SFBMAX),
              v = o(L3Side.SFBMAX),
              g = new CalcNoiseResult();
            calc_xmin(e, a, t, p), calc_noise(t, p, v, g, null);
            var S = 0;
            for (
              _ = t.sfb_lmax,
                t.block_type != c.SHORT_TYPE &&
                  0 == t.mixed_block_flag &&
                  (_ = 22),
                r = 0;
              r < _;
              r++
            ) {
              var M = h.scalefac_band.l[r],
                w = (A = h.scalefac_band.l[r + 1]) - M;
              for (l = 0; S < A; S++) l += t.xr[S] * t.xr[S];
              (l /= w),
                (u = 1e15),
                (h.pinfo.en[n][s][r] = u * l),
                (h.pinfo.xfsf[n][s][r] = (u * p[r] * v[r]) / w),
                a.en.l[r] > 0 && !e.ATHonly ? (l /= a.en.l[r]) : (l = 0),
                (h.pinfo.thr[n][s][r] =
                  u * Math.max(l * a.thm.l[r], h.ATH.l[r])),
                (h.pinfo.LAMEsfb[n][s][r] = 0),
                0 != t.preflag &&
                  r >= 11 &&
                  (h.pinfo.LAMEsfb[n][s][r] = -b * d[r]),
                r < c.SBPSY_l &&
                  (f(m[r] >= 0), (h.pinfo.LAMEsfb[n][s][r] -= b * m[r]));
            }
            if (t.block_type == c.SHORT_TYPE)
              for (_ = r, r = t.sfb_smin; r < c.SBMAX_s; r++) {
                (M = h.scalefac_band.s[r]),
                  (w = (A = h.scalefac_band.s[r + 1]) - M);
                for (var A, R = 0; R < 3; R++) {
                  for (l = 0, i = M; i < A; i++) (l += t.xr[S] * t.xr[S]), S++;
                  (l = Math.max(l / w, 1e-20)),
                    (u = 1e15),
                    (h.pinfo.en_s[n][s][3 * r + R] = u * l),
                    (h.pinfo.xfsf_s[n][s][3 * r + R] = (u * p[_] * v[_]) / w),
                    a.en.s[r][R] > 0 ? (l /= a.en.s[r][R]) : (l = 0),
                    (e.ATHonly || e.ATHshort) && (l = 0),
                    (h.pinfo.thr_s[n][s][3 * r + R] =
                      u * Math.max(l * a.thm.s[r][R], h.ATH.s[r])),
                    (h.pinfo.LAMEsfb_s[n][s][3 * r + R] =
                      -2 * t.subblock_gain[R]),
                    r < c.SBPSY_s &&
                      (h.pinfo.LAMEsfb_s[n][s][3 * r + R] -= b * m[_]),
                    _++;
                }
              }
            (h.pinfo.LAMEqss[n][s] = t.global_gain),
              (h.pinfo.LAMEmainbits[n][s] = t.part2_3_length + t.part2_length),
              (h.pinfo.LAMEsfbits[n][s] = t.part2_length),
              (h.pinfo.over[n][s] = g.over_count),
              (h.pinfo.max_noise[n][s] = 10 * g.max_noise),
              (h.pinfo.over_noise[n][s] = 10 * g.over_noise),
              (h.pinfo.tot_noise[n][s] = 10 * g.tot_noise),
              (h.pinfo.over_SSD[n][s] = g.over_SSD);
          });
      }
      (b.Q_MAX = 257),
        (b.Q_MAX2 = 116),
        (b.LARGE_BITS = 1e5),
        (b.IXMAX_VAL = 8206),
        (e.exports = b);
    },
    function (e, t, a) {
      var n = a(15),
        s = a(16),
        r = [32, 40, 48, 56, 64, 96, 128, 192, 256, 320];
      e.exports = function (e, t, a, _) {
        if (!t || 'WAV' === t) return n(e, _);
        if (((t = ~~t), -1 === r.indexOf(t)))
          throw new Error('Invalid encoding');
        return s(
          e,
          {
            bitrate: t,
          },
          a,
          _
        );
      };
    },
    function (e, t) {
      e.exports = function (e, t) {
        if (44100 !== e.sampleRate)
          throw new Error('Expecting 44100 Hz sample rate');
        var a = e.numberOfChannels;
        if (1 !== a && 2 !== a)
          throw new Error('Expecting mono or stereo audioBuffer');
        var n = e.length,
          s = new ArrayBuffer(44 + 2 * n * a),
          r = new Int16Array(s),
          _ = new Uint8Array(s),
          i = n * a * 2,
          o = i + 36,
          l = 44100 * a * 2;
        _.set([
          82,
          73,
          70,
          70,
          255 & o,
          (o >> 8) & 255,
          (o >> 16) & 255,
          (o >> 24) & 255,
          87,
          65,
          86,
          69,
          102,
          109,
          116,
          32,
          16,
          0,
          0,
          0,
          1,
          0,
          a,
          0,
          68,
          172,
          0,
          0,
          255 & l,
          (l >> 8) & 255,
          (l >> 16) & 255,
          (l >> 24) & 255,
          4,
          0,
          16,
          0,
          100,
          97,
          116,
          97,
          255 & i,
          (i >> 8) & 255,
          (i >> 16) & 255,
          (i >> 24) & 255,
        ]);
        for (var f = [], c = 0; c < a; c++) f.push(e.getChannelData(c));
        for (var u = 0, h = 22; u < n; u++)
          for (c = 0; c < a; c++) {
            var b = f[c][u];
            (b = Math.min(1, Math.max(-1, b))),
              (b = Math.round(32767 * b)),
              (r[h++] = b);
          }
        var m = new Blob([_], {
          type: 'audio/x-wav',
        });
        setTimeout(function () {
          return t(m);
        }, 30);
      };
    },
    function (e, t, a) {
      var n = a(17);
      e.exports = function (e, t, a, s) {
        if (44100 !== e.sampleRate)
          throw new Error('Expecting 44100 Hz sample rate');
        var r = e.numberOfChannels;
        if (1 !== r && 2 !== r)
          throw new Error('Expecting mono or stereo audioBuffer');
        var _ = t.bitrate || 128;
        _ < 96 && (r = 1);
        for (var i = e.length, o = [], l = 0; l < r; l++) {
          for (
            var f = e.getChannelData(l), c = new Int16Array(i), u = 0;
            u < i;
            ++u
          ) {
            var h = f[u];
            (h = Math.min(1, Math.max(-1, h))),
              (h = Math.round(32767 * h)),
              (c[u] = h);
          }
          o.push(c);
        }
        (BLOCK_SIZE = 1152), (mp3encoder = new n.Mp3Encoder(r, 44100, _));
        var b = [],
          m = 0;
        function p() {
          if (1 === r) {
            var e = o[0].subarray(m, m + BLOCK_SIZE);
            t = mp3encoder.encodeBuffer(e);
          } else {
            (chunkL = o[0].subarray(m, m + BLOCK_SIZE)),
              (chunkR = o[1].subarray(m, m + BLOCK_SIZE));
            var t = mp3encoder.encodeBuffer(chunkL, chunkR);
          }
          t.length > 0 && b.push(t), (m += BLOCK_SIZE);
        }
        !(function e() {
          if (m >= i) {
            var t = mp3encoder.flush();
            return (
              t.length > 0 && b.push(t),
              s(
                new Blob(b, {
                  type: 'audio/mp3',
                })
              )
            );
          }
          for (var n = performance.now(); m < i && performance.now() - n < 15; )
            p();
          a && a(m / i), setTimeout(e, 16.7);
        })();
      };
    },
    function (e, t, a) {
      var n = a(0),
        s =
          (n.System,
          n.VbrMode,
          n.Float,
          n.ShortBlock,
          n.Util,
          n.Arrays,
          n.new_array_n,
          n.new_byte),
        r =
          (n.new_double,
          n.new_float,
          n.new_float_n,
          n.new_int,
          n.new_int_n,
          n.assert);
      (Lame = a(18)),
        (Presets = a(30)),
        (GainAnalysis = a(9)),
        (QuantizePVT = a(13)),
        (Quantize = a(31)),
        (Takehiro = a(12)),
        (Reservoir = a(35)),
        (MPEGMode = a(7)),
        (BitStream = a(11));
      a(1);
      var _ = a(36),
        i = a(37);
      function o() {
        this.setModules = function (e, t) {
          e, t;
        };
      }
      function l() {
        this.setModules = function (e, t, a) {
          e, t, a;
        };
      }
      function f() {}
      function c() {
        this.setModules = function (e, t) {
          e, t;
        };
      }
      function u() {
        (this.dataOffset = 0),
          (this.dataLen = 0),
          (this.channels = 0),
          (this.sampleRate = 0);
      }
      function h(e) {
        return (
          (e.charCodeAt(0) << 24) |
          (e.charCodeAt(1) << 16) |
          (e.charCodeAt(2) << 8) |
          e.charCodeAt(3)
        );
      }
      (u.RIFF = h('RIFF')),
        (u.WAVE = h('WAVE')),
        (u.fmt_ = h('fmt ')),
        (u.data = h('data')),
        (u.readHeader = function (e) {
          var t = new u(),
            a = e.getUint32(0, !1);
          if (u.RIFF == a) {
            e.getUint32(4, !0);
            if (u.WAVE == e.getUint32(8, !1) && u.fmt_ == e.getUint32(12, !1)) {
              var n = e.getUint32(16, !0),
                s = 20;
              switch (n) {
                case 16:
                case 18:
                  (t.channels = e.getUint16(s + 2, !0)),
                    (t.sampleRate = e.getUint32(s + 4, !0));
                  break;
                default:
                  throw 'extended fmt chunk not implemented';
              }
              s += n;
              for (
                var r = u.data, _ = 0;
                r != a &&
                ((a = e.getUint32(s, !1)),
                (_ = e.getUint32(s + 4, !0)),
                r != a);

              )
                s += _ + 8;
              return (t.dataLen = _), (t.dataOffset = s + 8), t;
            }
          }
        }),
        (e.exports.Mp3Encoder = function (e, t, a) {
          3 != arguments.length &&
            (console.error(
              'WARN: Mp3Encoder(channels, samplerate, kbps) not specified'
            ),
            (e = 1),
            (t = 44100),
            (a = 128));
          var n = new Lame(),
            u = new o(),
            h = new GainAnalysis(),
            b = new BitStream(),
            m = new Presets(),
            p = new QuantizePVT(),
            d = new Quantize(),
            v = new i(),
            g = new _(),
            S = new c(),
            M = new Reservoir(),
            w = new Takehiro(),
            A = new l(),
            R = new f();
          n.setModules(h, b, m, p, d, v, g, S, R),
            b.setModules(h, R, g, v),
            S.setModules(b, g),
            m.setModules(n),
            d.setModules(b, M, p, w),
            p.setModules(w, M, n.enc.psy),
            M.setModules(b),
            w.setModules(p),
            v.setModules(n, b, g),
            u.setModules(A, R),
            A.setModules(g, S, m);
          var B = n.lame_init();
          (B.num_channels = e),
            (B.in_samplerate = t),
            (B.brate = a),
            (B.mode = MPEGMode.STEREO),
            (B.quality = 3),
            (B.bWriteVbrTag = !1),
            (B.disable_reservoir = !0),
            (B.write_id3tag_automatic = !1);
          var y = n.lame_init_params(B);
          r(0 == y);
          var E = 1152,
            T = 0 | (1.25 * E + 7200),
            x = s(T);
          (this.encodeBuffer = function (t, a) {
            1 == e && (a = t),
              r(t.length == a.length),
              t.length > E &&
                ((E = t.length), (x = s((T = 0 | (1.25 * E + 7200)))));
            var _ = n.lame_encode_buffer(B, t, a, t.length, x, 0, T);
            return new Int8Array(x.subarray(0, _));
          }),
            (this.flush = function () {
              var e = n.lame_encode_flush(B, x, 0, T);
              return new Int8Array(x.subarray(0, e));
            });
        }),
        (e.exports.WavHeader = u);
    },
    function (e, t, a) {
      var n = a(0),
        s = n.System,
        r = n.VbrMode,
        _ = (n.Float, n.ShortBlock),
        i =
          (n.Util,
          n.Arrays,
          n.new_array_n,
          n.new_byte,
          n.new_double,
          n.new_float),
        o = (n.new_float_n, n.new_int, n.new_int_n),
        l = n.new_short_n,
        f = n.assert,
        c = a(19),
        u = a(23),
        h = a(2),
        b = a(27),
        m = a(28),
        p = a(29),
        d = a(11),
        v = a(5),
        g = a(1);
      e.exports = function e() {
        var t,
          a,
          n,
          S,
          M,
          w = this;
        (e.V9 = 410),
          (e.V8 = 420),
          (e.V7 = 430),
          (e.V6 = 440),
          (e.V5 = 450),
          (e.V4 = 460),
          (e.V3 = 470),
          (e.V2 = 480),
          (e.V1 = 490),
          (e.V0 = 500),
          (e.R3MIX = 1e3),
          (e.STANDARD = 1001),
          (e.EXTREME = 1002),
          (e.INSANE = 1003),
          (e.STANDARD_FAST = 1004),
          (e.EXTREME_FAST = 1005),
          (e.MEDIUM = 1006),
          (e.MEDIUM_FAST = 1007),
          (e.LAME_MAXMP3BUFFER = 147456);
        var A,
          R,
          B,
          y = new c();
        function E() {
          (this.mask_adjust = 0),
            (this.mask_adjust_short = 0),
            (this.bo_l_weight = i(g.SBMAX_l)),
            (this.bo_s_weight = i(g.SBMAX_s));
        }
        function T() {
          this.lowerlimit = 0;
        }
        function x(e, t) {
          this.lowpass = t;
        }
        function k(e) {
          return e > 1 ? 0 : e <= 0 ? 1 : Math.cos((Math.PI / 2) * e);
        }
        function P(e, t) {
          switch (e) {
            case 44100:
              return (t.version = 1), 0;
            case 48e3:
              return (t.version = 1), 1;
            case 32e3:
              return (t.version = 1), 2;
            case 22050:
              return (t.version = 0), 0;
            case 24e3:
              return (t.version = 0), 1;
            case 16e3:
              return (t.version = 0), 2;
            case 11025:
              return (t.version = 0), 0;
            case 12e3:
              return (t.version = 0), 1;
            case 8e3:
              return (t.version = 0), 2;
            default:
              return (t.version = 0), -1;
          }
        }
        function I(e, t, a) {
          a < 16e3 && (t = 2);
          for (var n = v.bitrate_table[t][1], s = 2; s <= 14; s++)
            v.bitrate_table[t][s] > 0 &&
              Math.abs(v.bitrate_table[t][s] - e) < Math.abs(n - e) &&
              (n = v.bitrate_table[t][s]);
          return n;
        }
        function L(e, t, a) {
          a < 16e3 && (t = 2);
          for (var n = 0; n <= 14; n++)
            if (v.bitrate_table[t][n] > 0 && v.bitrate_table[t][n] == e)
              return n;
          return -1;
        }
        function V(e, t) {
          var a = [
              new x(8, 2e3),
              new x(16, 3700),
              new x(24, 3900),
              new x(32, 5500),
              new x(40, 7e3),
              new x(48, 7500),
              new x(56, 1e4),
              new x(64, 11e3),
              new x(80, 13500),
              new x(96, 15100),
              new x(112, 15600),
              new x(128, 17e3),
              new x(160, 17500),
              new x(192, 18600),
              new x(224, 19400),
              new x(256, 19700),
              new x(320, 20500),
            ],
            n = w.nearestBitrateFullIndex(t);
          e.lowerlimit = a[n].lowpass;
        }
        function H(e) {
          var t = g.BLKSIZE + e.framesize - g.FFTOFFSET;
          return (t = Math.max(t, 512 + e.framesize - 32)), f(h.MFSIZE >= t), t;
        }
        function O(e, t, a, n, s, r) {
          var _ = w.enc.lame_encode_mp3_frame(e, t, a, n, s, r);
          return e.frameNum++, _;
        }
        function N() {
          (this.n_in = 0), (this.n_out = 0);
        }
        function X() {
          this.num_used = 0;
        }
        function D(e, t, a) {
          var n = Math.PI * t;
          (e /= a) < 0 && (e = 0), e > 1 && (e = 1);
          var s = e - 0.5,
            r =
              0.42 -
              0.5 * Math.cos(2 * e * Math.PI) +
              0.08 * Math.cos(4 * e * Math.PI);
          return Math.abs(s) < 1e-9
            ? n / Math.PI
            : (r * Math.sin(a * n * s)) / (Math.PI * a * s);
        }
        function F(e, t, a, n, s, r, _, o, l) {
          var c,
            u,
            b = e.internal_flags,
            m = 0,
            p =
              e.out_samplerate /
              (function e(t, a) {
                return 0 != a ? e(a, t % a) : t;
              })(e.out_samplerate, e.in_samplerate);
          p > h.BPC && (p = h.BPC);
          var d =
              Math.abs(b.resample_ratio - Math.floor(0.5 + b.resample_ratio)) <
              1e-4
                ? 1
                : 0,
            v = 1 / b.resample_ratio;
          v > 1 && (v = 1);
          var g = 31;
          0 == g % 2 && --g;
          var S = (g += d) + 1;
          if (0 == b.fill_buffer_resample_init) {
            for (
              b.inbuf_old[0] = i(S), b.inbuf_old[1] = i(S), c = 0;
              c <= 2 * p;
              ++c
            )
              b.blackfilt[c] = i(S);
            for (b.itime[0] = 0, b.itime[1] = 0, m = 0; m <= 2 * p; m++) {
              var M = 0,
                w = (m - p) / (2 * p);
              for (c = 0; c <= g; c++) M += b.blackfilt[m][c] = D(c - w, v, g);
              for (c = 0; c <= g; c++) b.blackfilt[m][c] /= M;
            }
            b.fill_buffer_resample_init = 1;
          }
          var A = b.inbuf_old[l];
          for (u = 0; u < n; u++) {
            var R, B;
            if (
              ((R = u * b.resample_ratio),
              g + (m = 0 | Math.floor(R - b.itime[l])) - g / 2 >= _)
            )
              break;
            w = R - b.itime[l] - (m + (g % 2) * 0.5);
            f(Math.abs(w) <= 0.501), (B = 0 | Math.floor(2 * w * p + p + 0.5));
            var y = 0;
            for (c = 0; c <= g; ++c) {
              var E = c + m - g / 2;
              f(E < _),
                f(E + S >= 0),
                (y += (E < 0 ? A[S + E] : s[r + E]) * b.blackfilt[B][c]);
            }
            t[a + u] = y;
          }
          if (
            ((o.num_used = Math.min(_, g + m - g / 2)),
            (b.itime[l] += o.num_used - u * b.resample_ratio),
            o.num_used >= S)
          )
            for (c = 0; c < S; c++) A[c] = s[r + o.num_used + c - S];
          else {
            var T = S - o.num_used;
            for (c = 0; c < T; ++c) A[c] = A[c + o.num_used];
            for (m = 0; c < S; ++c, ++m) A[c] = s[r + m];
            f(m == o.num_used);
          }
          return u;
        }
        function Y(e, t, a, n, s, r) {
          var _ = e.internal_flags;
          if (_.resample_ratio < 0.9999 || _.resample_ratio > 1.0001)
            for (var i = 0; i < _.channels_out; i++) {
              var o = new X();
              (r.n_out = F(e, t[i], _.mf_size, e.framesize, a[i], n, s, o, i)),
                (r.n_in = o.num_used);
            }
          else {
            (r.n_out = Math.min(e.framesize, s)), (r.n_in = r.n_out);
            for (var l = 0; l < r.n_out; ++l)
              (t[0][_.mf_size + l] = a[0][n + l]),
                2 == _.channels_out && (t[1][_.mf_size + l] = a[1][n + l]);
          }
        }
        (this.enc = new g()),
          (this.setModules = function (e, s, r, _, i, o, l, f, c) {
            (t = e),
              (a = s),
              (n = r),
              (S = _),
              (M = i),
              (A = o),
              l,
              (R = f),
              (B = c),
              this.enc.setModules(a, y, S, A);
          }),
          (this.lame_init = function () {
            var e = new u();
            return 0 !=
              (function (e) {
                var t;
                return (
                  (e.class_id = 4294479419),
                  (t = e.internal_flags = new h()),
                  (e.mode = MPEGMode.NOT_SET),
                  (e.original = 1),
                  (e.in_samplerate = 44100),
                  (e.num_channels = 2),
                  (e.num_samples = -1),
                  (e.bWriteVbrTag = !0),
                  (e.quality = -1),
                  (e.short_blocks = null),
                  (t.subblock_gain = -1),
                  (e.lowpassfreq = 0),
                  (e.highpassfreq = 0),
                  (e.lowpasswidth = -1),
                  (e.highpasswidth = -1),
                  (e.VBR = r.vbr_off),
                  (e.VBR_q = 4),
                  (e.ATHcurve = -1),
                  (e.VBR_mean_bitrate_kbps = 128),
                  (e.VBR_min_bitrate_kbps = 0),
                  (e.VBR_max_bitrate_kbps = 0),
                  (e.VBR_hard_min = 0),
                  (t.VBR_min_bitrate = 1),
                  (t.VBR_max_bitrate = 13),
                  (e.quant_comp = -1),
                  (e.quant_comp_short = -1),
                  (e.msfix = -1),
                  (t.resample_ratio = 1),
                  (t.OldValue[0] = 180),
                  (t.OldValue[1] = 180),
                  (t.CurrentStep[0] = 4),
                  (t.CurrentStep[1] = 4),
                  (t.masking_lower = 1),
                  (t.nsPsy.attackthre = -1),
                  (t.nsPsy.attackthre_s = -1),
                  (e.scale = -1),
                  (e.athaa_type = -1),
                  (e.ATHtype = -1),
                  (e.athaa_loudapprox = -1),
                  (e.athaa_sensitivity = 0),
                  (e.useTemporal = null),
                  (e.interChRatio = -1),
                  (t.mf_samples_to_encode = g.ENCDELAY + g.POSTDELAY),
                  (e.encoder_padding = 0),
                  (t.mf_size = g.ENCDELAY - g.MDCTDELAY),
                  (e.findReplayGain = !1),
                  (e.decode_on_the_fly = !1),
                  (t.decode_on_the_fly = !1),
                  (t.findReplayGain = !1),
                  (t.findPeakSample = !1),
                  (t.RadioGain = 0),
                  (t.AudiophileGain = 0),
                  (t.noclipGainChange = 0),
                  (t.noclipScale = -1),
                  (e.preset = 0),
                  (e.write_id3tag_automatic = !0),
                  0
                );
              })(e)
              ? null
              : ((e.lame_allocated_gfp = 1), e);
          }),
          (this.nearestBitrateFullIndex = function (e) {
            var t = [
                8,
                16,
                24,
                32,
                40,
                48,
                56,
                64,
                80,
                96,
                112,
                128,
                160,
                192,
                224,
                256,
                320,
              ],
              a = 0,
              n = 0,
              s = 0,
              r = 0;
            (r = t[16]), (s = 16), (n = t[16]), (a = 16);
            for (var _ = 0; _ < 16; _++)
              if (Math.max(e, t[_ + 1]) != e) {
                (r = t[_ + 1]), (s = _ + 1), (n = t[_]), (a = _);
                break;
              }
            return r - e > e - n ? a : s;
          }),
          (this.lame_init_params = function (e) {
            var i,
              l,
              u,
              h = e.internal_flags;
            if (
              ((h.Class_ID = 0),
              null == h.ATH && (h.ATH = new b()),
              null == h.PSY && (h.PSY = new E()),
              null == h.rgdata && (h.rgdata = new m()),
              (h.channels_in = e.num_channels),
              1 == h.channels_in && (e.mode = MPEGMode.MONO),
              (h.channels_out = e.mode == MPEGMode.MONO ? 1 : 2),
              (h.mode_ext = g.MPG_MD_MS_LR),
              e.mode == MPEGMode.MONO && (e.force_ms = !1),
              e.VBR == r.vbr_off &&
                128 != e.VBR_mean_bitrate_kbps &&
                0 == e.brate &&
                (e.brate = e.VBR_mean_bitrate_kbps),
              e.VBR == r.vbr_off ||
                e.VBR == r.vbr_mtrh ||
                e.VBR == r.vbr_mt ||
                (e.free_format = !1),
              e.VBR == r.vbr_off &&
                0 == e.brate &&
                d.EQ(e.compression_ratio, 0) &&
                (e.compression_ratio = 11.025),
              e.VBR == r.vbr_off &&
                e.compression_ratio > 0 &&
                (0 == e.out_samplerate &&
                  (e.out_samplerate = map2MP3Frequency(
                    int(0.97 * e.in_samplerate)
                  )),
                (e.brate =
                  0 |
                  ((16 * e.out_samplerate * h.channels_out) /
                    (1e3 * e.compression_ratio))),
                (h.samplerate_index = P(e.out_samplerate, e)),
                e.free_format ||
                  (e.brate = I(e.brate, e.version, e.out_samplerate))),
              0 != e.out_samplerate &&
                (e.out_samplerate < 16e3
                  ? ((e.VBR_mean_bitrate_kbps = Math.max(
                      e.VBR_mean_bitrate_kbps,
                      8
                    )),
                    (e.VBR_mean_bitrate_kbps = Math.min(
                      e.VBR_mean_bitrate_kbps,
                      64
                    )))
                  : e.out_samplerate < 32e3
                  ? ((e.VBR_mean_bitrate_kbps = Math.max(
                      e.VBR_mean_bitrate_kbps,
                      8
                    )),
                    (e.VBR_mean_bitrate_kbps = Math.min(
                      e.VBR_mean_bitrate_kbps,
                      160
                    )))
                  : ((e.VBR_mean_bitrate_kbps = Math.max(
                      e.VBR_mean_bitrate_kbps,
                      32
                    )),
                    (e.VBR_mean_bitrate_kbps = Math.min(
                      e.VBR_mean_bitrate_kbps,
                      320
                    )))),
              0 == e.lowpassfreq)
            ) {
              var w = 16e3;
              switch (e.VBR) {
                case r.vbr_off:
                  V((x = new T()), e.brate), (w = x.lowerlimit);
                  break;
                case r.vbr_abr:
                  var x;
                  V((x = new T()), e.VBR_mean_bitrate_kbps), (w = x.lowerlimit);
                  break;
                case r.vbr_rh:
                  var H = [
                    19500,
                    19e3,
                    18600,
                    18e3,
                    17500,
                    16e3,
                    15600,
                    14900,
                    12500,
                    1e4,
                    3950,
                  ];
                  if (0 <= e.VBR_q && e.VBR_q <= 9) {
                    var O = H[e.VBR_q],
                      N = H[e.VBR_q + 1],
                      X = e.VBR_q_frac;
                    w = linear_int(O, N, X);
                  } else w = 19500;
                  break;
                default:
                  H = [
                    19500,
                    19e3,
                    18500,
                    18e3,
                    17500,
                    16500,
                    15500,
                    14500,
                    12500,
                    9500,
                    3950,
                  ];
                  if (0 <= e.VBR_q && e.VBR_q <= 9) {
                    (O = H[e.VBR_q]), (N = H[e.VBR_q + 1]), (X = e.VBR_q_frac);
                    w = linear_int(O, N, X);
                  } else w = 19500;
              }
              e.mode != MPEGMode.MONO ||
                (e.VBR != r.vbr_off && e.VBR != r.vbr_abr) ||
                (w *= 1.5),
                (e.lowpassfreq = 0 | w);
            }
            if (
              (0 == e.out_samplerate &&
                (2 * e.lowpassfreq > e.in_samplerate &&
                  (e.lowpassfreq = e.in_samplerate / 2),
                (e.out_samplerate =
                  ((i = 0 | e.lowpassfreq),
                  (l = e.in_samplerate),
                  (u = 44100),
                  l >= 48e3
                    ? (u = 48e3)
                    : l >= 44100
                    ? (u = 44100)
                    : l >= 32e3
                    ? (u = 32e3)
                    : l >= 24e3
                    ? (u = 24e3)
                    : l >= 22050
                    ? (u = 22050)
                    : l >= 16e3
                    ? (u = 16e3)
                    : l >= 12e3
                    ? (u = 12e3)
                    : l >= 11025
                    ? (u = 11025)
                    : l >= 8e3 && (u = 8e3),
                  -1 == i
                    ? u
                    : (i <= 15960 && (u = 44100),
                      i <= 15250 && (u = 32e3),
                      i <= 11220 && (u = 24e3),
                      i <= 9970 && (u = 22050),
                      i <= 7230 && (u = 16e3),
                      i <= 5420 && (u = 12e3),
                      i <= 4510 && (u = 11025),
                      i <= 3970 && (u = 8e3),
                      l < u
                        ? l > 44100
                          ? 48e3
                          : l > 32e3
                          ? 44100
                          : l > 24e3
                          ? 32e3
                          : l > 22050
                          ? 24e3
                          : l > 16e3
                          ? 22050
                          : l > 12e3
                          ? 16e3
                          : l > 11025
                          ? 12e3
                          : l > 8e3
                          ? 11025
                          : 8e3
                        : u)))),
              (e.lowpassfreq = Math.min(20500, e.lowpassfreq)),
              (e.lowpassfreq = Math.min(e.out_samplerate / 2, e.lowpassfreq)),
              e.VBR == r.vbr_off &&
                (e.compression_ratio =
                  (16 * e.out_samplerate * h.channels_out) / (1e3 * e.brate)),
              e.VBR == r.vbr_abr &&
                (e.compression_ratio =
                  (16 * e.out_samplerate * h.channels_out) /
                  (1e3 * e.VBR_mean_bitrate_kbps)),
              e.bWriteVbrTag ||
                ((e.findReplayGain = !1),
                (e.decode_on_the_fly = !1),
                (h.findPeakSample = !1)),
              (h.findReplayGain = e.findReplayGain),
              (h.decode_on_the_fly = e.decode_on_the_fly),
              h.decode_on_the_fly && (h.findPeakSample = !0),
              h.findReplayGain &&
                t.InitGainAnalysis(h.rgdata, e.out_samplerate) ==
                  GainAnalysis.INIT_GAIN_ANALYSIS_ERROR)
            )
              return (e.internal_flags = null), -6;
            switch (
              (h.decode_on_the_fly &&
                !e.decode_only &&
                (null != h.hip && B.hip_decode_exit(h.hip),
                (h.hip = B.hip_decode_init())),
              (h.mode_gr = e.out_samplerate <= 24e3 ? 1 : 2),
              (e.framesize = 576 * h.mode_gr),
              (e.encoder_delay = g.ENCDELAY),
              (h.resample_ratio = e.in_samplerate / e.out_samplerate),
              e.VBR)
            ) {
              case r.vbr_mt:
              case r.vbr_rh:
              case r.vbr_mtrh:
                e.compression_ratio = [
                  5.7,
                  6.5,
                  7.3,
                  8.2,
                  10,
                  11.9,
                  13,
                  14,
                  15,
                  16.5,
                ][e.VBR_q];
                break;
              case r.vbr_abr:
                e.compression_ratio =
                  (16 * e.out_samplerate * h.channels_out) /
                  (1e3 * e.VBR_mean_bitrate_kbps);
                break;
              default:
                e.compression_ratio =
                  (16 * e.out_samplerate * h.channels_out) / (1e3 * e.brate);
            }
            if (
              (e.mode == MPEGMode.NOT_SET && (e.mode = MPEGMode.JOINT_STEREO),
              e.highpassfreq > 0
                ? ((h.highpass1 = 2 * e.highpassfreq),
                  e.highpasswidth >= 0
                    ? (h.highpass2 = 2 * (e.highpassfreq + e.highpasswidth))
                    : (h.highpass2 = 2 * e.highpassfreq),
                  (h.highpass1 /= e.out_samplerate),
                  (h.highpass2 /= e.out_samplerate))
                : ((h.highpass1 = 0), (h.highpass2 = 0)),
              e.lowpassfreq > 0
                ? ((h.lowpass2 = 2 * e.lowpassfreq),
                  e.lowpasswidth >= 0
                    ? ((h.lowpass1 = 2 * (e.lowpassfreq - e.lowpasswidth)),
                      h.lowpass1 < 0 && (h.lowpass1 = 0))
                    : (h.lowpass1 = 2 * e.lowpassfreq),
                  (h.lowpass1 /= e.out_samplerate),
                  (h.lowpass2 /= e.out_samplerate))
                : ((h.lowpass1 = 0), (h.lowpass2 = 0)),
              (function (e) {
                var t = e.internal_flags,
                  a = 32,
                  n = -1;
                if (t.lowpass1 > 0) {
                  for (var r = 999, _ = 0; _ <= 31; _++) {
                    (f = _ / 31) >= t.lowpass2 && (a = Math.min(a, _)),
                      t.lowpass1 < f && f < t.lowpass2 && (r = Math.min(r, _));
                  }
                  (t.lowpass1 = 999 == r ? (a - 0.75) / 31 : (r - 0.75) / 31),
                    (t.lowpass2 = a / 31);
                }
                if (
                  (t.highpass2 > 0 &&
                    t.highpass2 < (0.75 / 31) * 0.9 &&
                    ((t.highpass1 = 0),
                    (t.highpass2 = 0),
                    s.err.println(
                      'Warning: highpass filter disabled.  highpass frequency too small\n'
                    )),
                  t.highpass2 > 0)
                ) {
                  var i = -1;
                  for (_ = 0; _ <= 31; _++) {
                    (f = _ / 31) <= t.highpass1 && (n = Math.max(n, _)),
                      t.highpass1 < f &&
                        f < t.highpass2 &&
                        (i = Math.max(i, _));
                  }
                  (t.highpass1 = n / 31),
                    (t.highpass2 = -1 == i ? (n + 0.75) / 31 : (i + 0.75) / 31);
                }
                for (_ = 0; _ < 32; _++) {
                  var o,
                    l,
                    f = _ / 31;
                  (o =
                    t.highpass2 > t.highpass1
                      ? k(
                          (t.highpass2 - f) /
                            (t.highpass2 - t.highpass1 + 1e-20)
                        )
                      : 1),
                    (l =
                      t.lowpass2 > t.lowpass1
                        ? k(
                            (f - t.lowpass1) / (t.lowpass2 - t.lowpass1 + 1e-20)
                          )
                        : 1),
                    (t.amp_filter[_] = o * l);
                }
              })(e),
              (h.samplerate_index = P(e.out_samplerate, e)),
              h.samplerate_index < 0)
            )
              return (e.internal_flags = null), -1;
            if (e.VBR == r.vbr_off) {
              if (e.free_format) h.bitrate_index = 0;
              else if (
                ((e.brate = I(e.brate, e.version, e.out_samplerate)),
                (h.bitrate_index = L(e.brate, e.version, e.out_samplerate)),
                h.bitrate_index <= 0)
              )
                return (e.internal_flags = null), -1;
            } else h.bitrate_index = 1;
            e.analysis && (e.bWriteVbrTag = !1),
              null != h.pinfo && (e.bWriteVbrTag = !1),
              a.init_bit_stream_w(h);
            for (
              var D,
                F =
                  h.samplerate_index +
                  3 * e.version +
                  6 * (e.out_samplerate < 16e3 ? 1 : 0),
                Y = 0;
              Y < g.SBMAX_l + 1;
              Y++
            )
              h.scalefac_band.l[Y] = S.sfBandIndex[F].l[Y];
            for (Y = 0; Y < g.PSFB21 + 1; Y++) {
              var q =
                  (h.scalefac_band.l[22] - h.scalefac_band.l[21]) / g.PSFB21,
                C = h.scalefac_band.l[21] + Y * q;
              h.scalefac_band.psfb21[Y] = C;
            }
            h.scalefac_band.psfb21[g.PSFB21] = 576;
            for (Y = 0; Y < g.SBMAX_s + 1; Y++)
              h.scalefac_band.s[Y] = S.sfBandIndex[F].s[Y];
            for (Y = 0; Y < g.PSFB12 + 1; Y++) {
              (q = (h.scalefac_band.s[13] - h.scalefac_band.s[12]) / g.PSFB12),
                (C = h.scalefac_band.s[12] + Y * q);
              h.scalefac_band.psfb12[Y] = C;
            }
            for (
              h.scalefac_band.psfb12[g.PSFB12] = 192,
                1 == e.version
                  ? (h.sideinfo_len = 1 == h.channels_out ? 21 : 36)
                  : (h.sideinfo_len = 1 == h.channels_out ? 13 : 21),
                e.error_protection && (h.sideinfo_len += 2),
                (function (e) {
                  var t = e.internal_flags;
                  (e.frameNum = 0),
                    e.write_id3tag_automatic && R.id3tag_write_v2(e),
                    (t.bitrate_stereoMode_Hist = o([16, 5])),
                    (t.bitrate_blockType_Hist = o([16, 6])),
                    (t.PeakSample = 0),
                    e.bWriteVbrTag && A.InitVbrTag(e);
                })(e),
                h.Class_ID = 4294479419,
                D = 0;
              D < 19;
              D++
            )
              h.nsPsy.pefirbuf[D] = 700 * h.mode_gr * h.channels_out;
            switch (
              (-1 == e.ATHtype && (e.ATHtype = 4),
              f(e.VBR_q <= 9),
              f(e.VBR_q >= 0),
              e.VBR)
            ) {
              case r.vbr_mt:
                e.VBR = r.vbr_mtrh;
              case r.vbr_mtrh:
                null == e.useTemporal && (e.useTemporal = !1),
                  n.apply_preset(e, 500 - 10 * e.VBR_q, 0),
                  e.quality < 0 && (e.quality = LAME_DEFAULT_QUALITY),
                  e.quality < 5 && (e.quality = 0),
                  e.quality > 5 && (e.quality = 5),
                  (h.PSY.mask_adjust = e.maskingadjust),
                  (h.PSY.mask_adjust_short = e.maskingadjust_short),
                  e.experimentalY
                    ? (h.sfb21_extra = !1)
                    : (h.sfb21_extra = e.out_samplerate > 44e3),
                  (h.iteration_loop = new VBRNewIterationLoop(M));
                break;
              case r.vbr_rh:
                n.apply_preset(e, 500 - 10 * e.VBR_q, 0),
                  (h.PSY.mask_adjust = e.maskingadjust),
                  (h.PSY.mask_adjust_short = e.maskingadjust_short),
                  e.experimentalY
                    ? (h.sfb21_extra = !1)
                    : (h.sfb21_extra = e.out_samplerate > 44e3),
                  e.quality > 6 && (e.quality = 6),
                  e.quality < 0 && (e.quality = LAME_DEFAULT_QUALITY),
                  (h.iteration_loop = new VBROldIterationLoop(M));
                break;
              default:
                var j;
                (h.sfb21_extra = !1),
                  e.quality < 0 && (e.quality = LAME_DEFAULT_QUALITY),
                  (j = e.VBR) == r.vbr_off &&
                    (e.VBR_mean_bitrate_kbps = e.brate),
                  n.apply_preset(e, e.VBR_mean_bitrate_kbps, 0),
                  (e.VBR = j),
                  (h.PSY.mask_adjust = e.maskingadjust),
                  (h.PSY.mask_adjust_short = e.maskingadjust_short),
                  j == r.vbr_off
                    ? (h.iteration_loop = new p(M))
                    : (h.iteration_loop = new ABRIterationLoop(M));
            }
            if ((f(e.scale >= 0), e.VBR != r.vbr_off)) {
              if (
                ((h.VBR_min_bitrate = 1),
                (h.VBR_max_bitrate = 14),
                e.out_samplerate < 16e3 && (h.VBR_max_bitrate = 8),
                0 != e.VBR_min_bitrate_kbps &&
                  ((e.VBR_min_bitrate_kbps = I(
                    e.VBR_min_bitrate_kbps,
                    e.version,
                    e.out_samplerate
                  )),
                  (h.VBR_min_bitrate = L(
                    e.VBR_min_bitrate_kbps,
                    e.version,
                    e.out_samplerate
                  )),
                  h.VBR_min_bitrate < 0))
              )
                return -1;
              if (
                0 != e.VBR_max_bitrate_kbps &&
                ((e.VBR_max_bitrate_kbps = I(
                  e.VBR_max_bitrate_kbps,
                  e.version,
                  e.out_samplerate
                )),
                (h.VBR_max_bitrate = L(
                  e.VBR_max_bitrate_kbps,
                  e.version,
                  e.out_samplerate
                )),
                h.VBR_max_bitrate < 0)
              )
                return -1;
              (e.VBR_min_bitrate_kbps =
                v.bitrate_table[e.version][h.VBR_min_bitrate]),
                (e.VBR_max_bitrate_kbps =
                  v.bitrate_table[e.version][h.VBR_max_bitrate]),
                (e.VBR_mean_bitrate_kbps = Math.min(
                  v.bitrate_table[e.version][h.VBR_max_bitrate],
                  e.VBR_mean_bitrate_kbps
                )),
                (e.VBR_mean_bitrate_kbps = Math.max(
                  v.bitrate_table[e.version][h.VBR_min_bitrate],
                  e.VBR_mean_bitrate_kbps
                ));
            }
            return (
              e.tune &&
                ((h.PSY.mask_adjust += e.tune_value_a),
                (h.PSY.mask_adjust_short += e.tune_value_a)),
              (function (e) {
                var t = e.internal_flags;
                switch (e.quality) {
                  default:
                  case 9:
                    (t.psymodel = 0),
                      (t.noise_shaping = 0),
                      (t.noise_shaping_amp = 0),
                      (t.noise_shaping_stop = 0),
                      (t.use_best_huffman = 0),
                      (t.full_outer_loop = 0);
                    break;
                  case 8:
                    e.quality = 7;
                  case 7:
                    (t.psymodel = 1),
                      (t.noise_shaping = 0),
                      (t.noise_shaping_amp = 0),
                      (t.noise_shaping_stop = 0),
                      (t.use_best_huffman = 0),
                      (t.full_outer_loop = 0);
                    break;
                  case 6:
                  case 5:
                    (t.psymodel = 1),
                      0 == t.noise_shaping && (t.noise_shaping = 1),
                      (t.noise_shaping_amp = 0),
                      (t.noise_shaping_stop = 0),
                      -1 == t.subblock_gain && (t.subblock_gain = 1),
                      (t.use_best_huffman = 0),
                      (t.full_outer_loop = 0);
                    break;
                  case 4:
                    (t.psymodel = 1),
                      0 == t.noise_shaping && (t.noise_shaping = 1),
                      (t.noise_shaping_amp = 0),
                      (t.noise_shaping_stop = 0),
                      -1 == t.subblock_gain && (t.subblock_gain = 1),
                      (t.use_best_huffman = 1),
                      (t.full_outer_loop = 0);
                    break;
                  case 3:
                    (t.psymodel = 1),
                      0 == t.noise_shaping && (t.noise_shaping = 1),
                      (t.noise_shaping_amp = 1),
                      (t.noise_shaping_stop = 1),
                      -1 == t.subblock_gain && (t.subblock_gain = 1),
                      (t.use_best_huffman = 1),
                      (t.full_outer_loop = 0);
                    break;
                  case 2:
                    (t.psymodel = 1),
                      0 == t.noise_shaping && (t.noise_shaping = 1),
                      0 == t.substep_shaping && (t.substep_shaping = 2),
                      (t.noise_shaping_amp = 1),
                      (t.noise_shaping_stop = 1),
                      -1 == t.subblock_gain && (t.subblock_gain = 1),
                      (t.use_best_huffman = 1),
                      (t.full_outer_loop = 0);
                    break;
                  case 1:
                  case 0:
                    (t.psymodel = 1),
                      0 == t.noise_shaping && (t.noise_shaping = 1),
                      0 == t.substep_shaping && (t.substep_shaping = 2),
                      (t.noise_shaping_amp = 2),
                      (t.noise_shaping_stop = 1),
                      -1 == t.subblock_gain && (t.subblock_gain = 1),
                      (t.use_best_huffman = 1),
                      (t.full_outer_loop = 0);
                }
              })(e),
              f(e.scale >= 0),
              e.athaa_type < 0
                ? (h.ATH.useAdjust = 3)
                : (h.ATH.useAdjust = e.athaa_type),
              (h.ATH.aaSensitivityP = Math.pow(10, e.athaa_sensitivity / -10)),
              null == e.short_blocks &&
                (e.short_blocks = _.short_block_allowed),
              e.short_blocks != _.short_block_allowed ||
                (e.mode != MPEGMode.JOINT_STEREO &&
                  e.mode != MPEGMode.STEREO) ||
                (e.short_blocks = _.short_block_coupled),
              e.quant_comp < 0 && (e.quant_comp = 1),
              e.quant_comp_short < 0 && (e.quant_comp_short = 0),
              e.msfix < 0 && (e.msfix = 0),
              (e.exp_nspsytune = 1 | e.exp_nspsytune),
              e.internal_flags.nsPsy.attackthre < 0 &&
                (e.internal_flags.nsPsy.attackthre = c.NSATTACKTHRE),
              e.internal_flags.nsPsy.attackthre_s < 0 &&
                (e.internal_flags.nsPsy.attackthre_s = c.NSATTACKTHRE_S),
              f(e.scale >= 0),
              e.scale < 0 && (e.scale = 1),
              e.ATHtype < 0 && (e.ATHtype = 4),
              e.ATHcurve < 0 && (e.ATHcurve = 4),
              e.athaa_loudapprox < 0 && (e.athaa_loudapprox = 2),
              e.interChRatio < 0 && (e.interChRatio = 0),
              null == e.useTemporal && (e.useTemporal = !0),
              (h.slot_lag = h.frac_SpF = 0),
              e.VBR == r.vbr_off &&
                (h.slot_lag = h.frac_SpF =
                  (72e3 * (e.version + 1) * e.brate) % e.out_samplerate | 0),
              S.iteration_init(e),
              y.psymodel_init(e),
              f(e.scale >= 0),
              0
            );
          }),
          (this.lame_encode_flush = function (e, t, n, s) {
            var r,
              _,
              i,
              o,
              f = e.internal_flags,
              c = l([2, 1152]),
              u = 0,
              h = f.mf_samples_to_encode - g.POSTDELAY,
              b = H(e);
            if (f.mf_samples_to_encode < 1) return 0;
            for (
              r = 0,
                e.in_samplerate != e.out_samplerate &&
                  (h += (16 * e.out_samplerate) / e.in_samplerate),
                (i = e.framesize - (h % e.framesize)) < 576 &&
                  (i += e.framesize),
                e.encoder_padding = i,
                o = (h + i) / e.framesize;
              o > 0 && u >= 0;

            ) {
              var m = b - f.mf_size,
                p = e.frameNum;
              (m *= e.in_samplerate),
                (m /= e.out_samplerate) > 1152 && (m = 1152),
                m < 1 && (m = 1),
                (_ = s - r),
                0 == s && (_ = 0),
                (n += u = this.lame_encode_buffer(e, c[0], c[1], m, t, n, _)),
                (r += u),
                (o -= p != e.frameNum ? 1 : 0);
            }
            if (((f.mf_samples_to_encode = 0), u < 0)) return u;
            if (
              ((_ = s - r),
              0 == s && (_ = 0),
              a.flush_bitstream(e),
              (u = a.copy_buffer(f, t, n, _, 1)) < 0)
            )
              return u;
            if (
              ((n += u),
              (_ = s - (r += u)),
              0 == s && (_ = 0),
              e.write_id3tag_automatic)
            ) {
              if (
                (R.id3tag_write_v1(e), (u = a.copy_buffer(f, t, n, _, 0)) < 0)
              )
                return u;
              r += u;
            }
            return r;
          }),
          (this.lame_encode_buffer = function (e, n, s, r, _, o, l) {
            var c = e.internal_flags,
              u = [null, null];
            if (4294479419 != c.Class_ID) return -3;
            if (0 == r) return 0;
            !(function (e, t) {
              (null == e.in_buffer_0 || e.in_buffer_nsamples < t) &&
                ((e.in_buffer_0 = i(t)),
                (e.in_buffer_1 = i(t)),
                (e.in_buffer_nsamples = t));
            })(c, r),
              (u[0] = c.in_buffer_0),
              (u[1] = c.in_buffer_1);
            for (var b = 0; b < r; b++)
              (u[0][b] = n[b]), c.channels_in > 1 && (u[1][b] = s[b]);
            return (function (e, n, s, r, _, i, o) {
              var l,
                c,
                u,
                b,
                m,
                p = e.internal_flags,
                v = 0,
                S = [null, null],
                M = [null, null];
              if (4294479419 != p.Class_ID) return -3;
              if (0 == r) return 0;
              if ((m = a.copy_buffer(p, _, i, o, 0)) < 0) return m;
              if (
                ((i += m),
                (v += m),
                (M[0] = n),
                (M[1] = s),
                d.NEQ(e.scale, 0) && d.NEQ(e.scale, 1))
              )
                for (c = 0; c < r; ++c)
                  (M[0][c] *= e.scale),
                    2 == p.channels_out && (M[1][c] *= e.scale);
              if (d.NEQ(e.scale_left, 0) && d.NEQ(e.scale_left, 1))
                for (c = 0; c < r; ++c) M[0][c] *= e.scale_left;
              if (d.NEQ(e.scale_right, 0) && d.NEQ(e.scale_right, 1))
                for (c = 0; c < r; ++c) M[1][c] *= e.scale_right;
              if (2 == e.num_channels && 1 == p.channels_out)
                for (c = 0; c < r; ++c)
                  (M[0][c] = 0.5 * (M[0][c] + M[1][c])), (M[1][c] = 0);
              (b = H(e)), (S[0] = p.mfbuf[0]), (S[1] = p.mfbuf[1]);
              var w = 0;
              for (; r > 0; ) {
                var A,
                  R,
                  B = [null, null];
                (B[0] = M[0]), (B[1] = M[1]);
                var y = new N();
                if (
                  (Y(e, S, B, w, r, y),
                  (A = y.n_in),
                  (R = y.n_out),
                  p.findReplayGain &&
                    !p.decode_on_the_fly &&
                    t.AnalyzeSamples(
                      p.rgdata,
                      S[0],
                      p.mf_size,
                      S[1],
                      p.mf_size,
                      R,
                      p.channels_out
                    ) == GainAnalysis.GAIN_ANALYSIS_ERROR)
                )
                  return -6;
                if (
                  ((r -= A),
                  (w += A),
                  p.channels_out,
                  (p.mf_size += R),
                  f(p.mf_size <= h.MFSIZE),
                  p.mf_samples_to_encode < 1 &&
                    (p.mf_samples_to_encode = g.ENCDELAY + g.POSTDELAY),
                  (p.mf_samples_to_encode += R),
                  p.mf_size >= b)
                ) {
                  var E = o - v;
                  if ((0 == o && (E = 0), (l = O(e, S[0], S[1], _, i, E)) < 0))
                    return l;
                  for (
                    i += l,
                      v += l,
                      p.mf_size -= e.framesize,
                      p.mf_samples_to_encode -= e.framesize,
                      u = 0;
                    u < p.channels_out;
                    u++
                  )
                    for (c = 0; c < p.mf_size; c++)
                      S[u][c] = S[u][c + e.framesize];
                }
              }
              return f(0 == r), v;
            })(e, u[0], u[1], r, _, o, l);
          });
      };
    },
    function (e, t, a) {
      var n = a(0),
        s = (n.System, n.VbrMode),
        r = n.Float,
        _ = n.ShortBlock,
        i = n.Util,
        o = n.Arrays,
        l = (n.new_array_n, n.new_byte, n.new_double, n.new_float),
        f = n.new_float_n,
        c = n.new_int,
        u = (n.new_int_n, n.assert),
        h = a(20),
        b = a(1);
      e.exports = function () {
        var e = new h(),
          t = 2.302585092994046,
          a = 1 / 217621504 / (b.BLKSIZE / 2);
        function n(e, t) {
          for (var n = 0, s = 0; s < b.BLKSIZE / 2; ++s)
            n += e[s] * t.ATH.eql_w[s];
          return (n *= a);
        }
        function m(t, a, s, r, _, o, l, f, c, u, h) {
          var m = t.internal_flags;
          if (c < 2)
            e.fft_long(m, r[_], c, u, h), e.fft_short(m, o[l], c, u, h);
          else if (2 == c) {
            for (var p = b.BLKSIZE - 1; p >= 0; --p) {
              var d = r[_ + 0][p],
                v = r[_ + 1][p];
              (r[_ + 0][p] = (d + v) * i.SQRT2 * 0.5),
                (r[_ + 1][p] = (d - v) * i.SQRT2 * 0.5);
            }
            for (var g = 2; g >= 0; --g)
              for (p = b.BLKSIZE_s - 1; p >= 0; --p) {
                (d = o[l + 0][g][p]), (v = o[l + 1][g][p]);
                (o[l + 0][g][p] = (d + v) * i.SQRT2 * 0.5),
                  (o[l + 1][g][p] = (d - v) * i.SQRT2 * 0.5);
              }
          }
          (a[0] = r[_ + 0][0]), (a[0] *= a[0]);
          for (p = b.BLKSIZE / 2 - 1; p >= 0; --p) {
            var S = r[_ + 0][b.BLKSIZE / 2 - p],
              M = r[_ + 0][b.BLKSIZE / 2 + p];
            a[b.BLKSIZE / 2 - p] = 0.5 * (S * S + M * M);
          }
          for (g = 2; g >= 0; --g) {
            (s[g][0] = o[l + 0][g][0]), (s[g][0] *= s[g][0]);
            for (p = b.BLKSIZE_s / 2 - 1; p >= 0; --p) {
              (S = o[l + 0][g][b.BLKSIZE_s / 2 - p]),
                (M = o[l + 0][g][b.BLKSIZE_s / 2 + p]);
              s[g][b.BLKSIZE_s / 2 - p] = 0.5 * (S * S + M * M);
            }
          }
          var w = 0;
          for (p = 11; p < b.HBLKSIZE; p++) w += a[p];
          if (((m.tot_ener[c] = w), t.analysis)) {
            for (p = 0; p < b.HBLKSIZE; p++)
              (m.pinfo.energy[f][c][p] = m.pinfo.energy_save[c][p]),
                (m.pinfo.energy_save[c][p] = a[p]);
            m.pinfo.pe[f][c] = m.pe[c];
          }
          2 == t.athaa_loudapprox &&
            c < 2 &&
            ((m.loudness_sq[f][c] = m.loudness_sq_save[c]),
            (m.loudness_sq_save[c] = n(a, m)));
        }
        var p,
          d,
          v,
          g = [
            1,
            0.79433,
            0.63096,
            0.63096,
            0.63096,
            0.63096,
            0.63096,
            0.25119,
            0.11749,
          ],
          S = [
            3.3246 * 3.3246,
            3.23837 * 3.23837,
            9.9500500969,
            9.0247369744,
            8.1854926609,
            7.0440875649,
            2.46209 * 2.46209,
            2.284 * 2.284,
            4.4892710641,
            1.96552 * 1.96552,
            1.82335 * 1.82335,
            1.69146 * 1.69146,
            2.4621061921,
            2.1508568964,
            1.37074 * 1.37074,
            1.31036 * 1.31036,
            1.5691069696,
            1.4555939904,
            1.16203 * 1.16203,
            1.2715945225,
            1.09428 * 1.09428,
            1.0659 * 1.0659,
            1.0779838276,
            1.0382591025,
            1,
          ],
          M = [
            1.7782755904,
            1.35879 * 1.35879,
            1.38454 * 1.38454,
            1.39497 * 1.39497,
            1.40548 * 1.40548,
            1.3537 * 1.3537,
            1.6999465924,
            1.22321 * 1.22321,
            1.3169398564,
            1,
          ],
          w = [
            5.5396212496,
            2.29259 * 2.29259,
            4.9868695969,
            2.12675 * 2.12675,
            2.02545 * 2.02545,
            1.87894 * 1.87894,
            1.74303 * 1.74303,
            1.61695 * 1.61695,
            2.2499700001,
            1.39148 * 1.39148,
            1.29083 * 1.29083,
            1.19746 * 1.19746,
            1.2339655056,
            1.0779838276,
          ];
        function A(e, t, a, n, s, r) {
          var _;
          if (t > e) {
            if (!(t < e * d)) return e + t;
            _ = t / e;
          } else {
            if (e >= t * d) return e + t;
            _ = e / t;
          }
          if ((u(e >= 0), u(t >= 0), (e += t), n + 3 <= 6)) {
            if (_ >= p) return e;
            var o = 0 | i.FAST_LOG10_X(_, 16);
            return e * M[o];
          }
          var l, f;
          o = 0 | i.FAST_LOG10_X(_, 16);
          return (
            (t =
              0 != r
                ? s.ATH.cb_s[a] * s.ATH.adjust
                : s.ATH.cb_l[a] * s.ATH.adjust),
            u(t >= 0),
            e < v * t
              ? e > t
                ? ((l = 1),
                  o <= 13 && (l = w[o]),
                  (f = i.FAST_LOG10_X(e / t, 10 / 15)),
                  e * ((S[o] - l) * f + l))
                : o > 13
                ? e
                : e * w[o]
              : e * S[o]
          );
        }
        var R = [
          1.7782755904,
          1.35879 * 1.35879,
          1.38454 * 1.38454,
          1.39497 * 1.39497,
          1.40548 * 1.40548,
          1.3537 * 1.3537,
          1.6999465924,
          1.22321 * 1.22321,
          1.3169398564,
          1,
        ];
        function B(e, t, a) {
          var n;
          if ((e < 0 && (e = 0), t < 0 && (t = 0), e <= 0)) return t;
          if (t <= 0) return e;
          if (((n = t > e ? t / e : e / t), -2 <= a && a <= 2)) {
            if (n >= p) return e + t;
            var s = 0 | i.FAST_LOG10_X(n, 16);
            return (e + t) * R[s];
          }
          return n < d ? e + t : (e < t && (e = t), e);
        }
        function y(e, t, a, n, s) {
          var r,
            _,
            i = 0,
            o = 0;
          for (r = _ = 0; r < b.SBMAX_s; ++_, ++r) {
            for (var l = e.bo_s[r], f = e.npart_s, c = l < f ? l : f; _ < c; )
              u(t[_] >= 0), u(a[_] >= 0), (i += t[_]), (o += a[_]), _++;
            if (((e.en[n].s[r][s] = i), (e.thm[n].s[r][s] = o), _ >= f)) {
              ++r;
              break;
            }
            u(t[_] >= 0), u(a[_] >= 0);
            var h = e.PSY.bo_s_weight[r],
              m = 1 - h;
            (i = h * t[_]),
              (o = h * a[_]),
              (e.en[n].s[r][s] += i),
              (e.thm[n].s[r][s] += o),
              (i = m * t[_]),
              (o = m * a[_]);
          }
          for (; r < b.SBMAX_s; ++r)
            (e.en[n].s[r][s] = 0), (e.thm[n].s[r][s] = 0);
        }
        function E(e, t, a, n) {
          var s,
            r,
            _ = 0,
            i = 0;
          for (s = r = 0; s < b.SBMAX_l; ++r, ++s) {
            for (var o = e.bo_l[s], l = e.npart_l, f = o < l ? o : l; r < f; )
              u(t[r] >= 0), u(a[r] >= 0), (_ += t[r]), (i += a[r]), r++;
            if (((e.en[n].l[s] = _), (e.thm[n].l[s] = i), r >= l)) {
              ++s;
              break;
            }
            u(t[r] >= 0), u(a[r] >= 0);
            var c = e.PSY.bo_l_weight[s],
              h = 1 - c;
            (_ = c * t[r]),
              (i = c * a[r]),
              (e.en[n].l[s] += _),
              (e.thm[n].l[s] += i),
              (_ = h * t[r]),
              (i = h * a[r]);
          }
          for (; s < b.SBMAX_l; ++s) (e.en[n].l[s] = 0), (e.thm[n].l[s] = 0);
        }
        function T(e, t, a, n, s, r) {
          var _,
            i,
            o = e.internal_flags;
          for (i = _ = 0; i < o.npart_s; ++i) {
            for (
              var l = 0, f = 0, c = o.numlines_s[i], h = 0;
              h < c;
              ++h, ++_
            ) {
              var m = t[r][_];
              (l += m), f < m && (f = m);
            }
            a[i] = l;
          }
          for (u(i == o.npart_s), u(129 == _), _ = i = 0; i < o.npart_s; i++) {
            var p = o.s3ind_s[i][0],
              d = o.s3_ss[_++] * a[p];
            for (++p; p <= o.s3ind_s[i][1]; )
              (d += o.s3_ss[_] * a[p]), ++_, ++p;
            var v = 2 * o.nb_s1[s][i];
            if (
              ((n[i] = Math.min(d, v)), o.blocktype_old[1 & s] == b.SHORT_TYPE)
            ) {
              v = 16 * o.nb_s2[s][i];
              var g = n[i];
              n[i] = Math.min(v, g);
            }
            (o.nb_s2[s][i] = o.nb_s1[s][i]), (o.nb_s1[s][i] = d), u(n[i] >= 0);
          }
          for (; i <= b.CBANDS; ++i) (a[i] = 0), (n[i] = 0);
        }
        function x(e, t, a) {
          return a >= 1 ? e : a <= 0 ? t : t > 0 ? Math.pow(e / t, a) * t : 0;
        }
        var k = [
          11.8,
          13.6,
          17.2,
          32,
          46.5,
          51.3,
          57.5,
          67.1,
          71.5,
          84.6,
          97.6,
          130,
        ];
        function P(e, a) {
          for (var n = 309.07, s = 0; s < b.SBMAX_s - 1; s++)
            for (var r = 0; r < 3; r++) {
              var _ = e.thm.s[s][r];
              if ((u(s < k.length), _ > 0)) {
                var o = _ * a,
                  l = e.en.s[s][r];
                l > o &&
                  (l > 1e10 * o
                    ? (n += k[s] * (10 * t))
                    : (u(o > 0), (n += k[s] * i.FAST_LOG10(l / o))));
              }
            }
          return n;
        }
        var I = [
          6.8,
          5.8,
          5.8,
          6.4,
          6.5,
          9.9,
          12.1,
          14.4,
          15,
          18.9,
          21.6,
          26.9,
          34.2,
          40.2,
          46.8,
          56.5,
          60.7,
          73.9,
          85.7,
          93.4,
          126.1,
        ];
        function L(e, a) {
          for (var n = 281.0575, s = 0; s < b.SBMAX_l - 1; s++) {
            var r = e.thm.l[s];
            if ((u(s < I.length), r > 0)) {
              var _ = r * a,
                o = e.en.l[s];
              o > _ &&
                (o > 1e10 * _
                  ? (n += I[s] * (10 * t))
                  : (u(_ > 0), (n += I[s] * i.FAST_LOG10(o / _))));
            }
          }
          return n;
        }
        function V(e, t, a, n, s) {
          var r, _;
          for (r = _ = 0; r < e.npart_l; ++r) {
            var i,
              o = 0,
              l = 0;
            for (i = 0; i < e.numlines_l[r]; ++i, ++_) {
              var f = t[_];
              u(f >= 0), (o += f), l < f && (l = f);
            }
            (a[r] = o),
              (n[r] = l),
              (s[r] = o * e.rnumlines_l[r]),
              u(e.rnumlines_l[r] >= 0),
              u(o >= 0),
              u(a[r] >= 0),
              u(n[r] >= 0),
              u(s[r] >= 0);
          }
        }
        function H(e, t, a, n) {
          var s = g.length - 1,
            r = 0,
            _ = a[r] + a[r + 1];
          (u(_ >= 0), _ > 0)
            ? ((i = t[r]) < t[r + 1] && (i = t[r + 1]),
              u(e.numlines_l[r] + e.numlines_l[r + 1] - 1 > 0),
              (o =
                0 |
                (_ =
                  (20 * (2 * i - _)) /
                  (_ * (e.numlines_l[r] + e.numlines_l[r + 1] - 1)))) > s &&
                (o = s),
              (n[r] = o))
            : (n[r] = 0);
          for (r = 1; r < e.npart_l - 1; r++) {
            var i, o;
            if (((_ = a[r - 1] + a[r] + a[r + 1]), u(_ >= 0), _ > 0))
              (i = t[r - 1]) < t[r] && (i = t[r]),
                i < t[r + 1] && (i = t[r + 1]),
                u(
                  e.numlines_l[r - 1] +
                    e.numlines_l[r] +
                    e.numlines_l[r + 1] -
                    1 >
                    0
                ),
                (o =
                  0 |
                  (_ =
                    (20 * (3 * i - _)) /
                    (_ *
                      (e.numlines_l[r - 1] +
                        e.numlines_l[r] +
                        e.numlines_l[r + 1] -
                        1)))) > s && (o = s),
                (n[r] = o);
            else n[r] = 0;
          }
          (u(r > 0),
          u(r == e.npart_l - 1),
          (_ = a[r - 1] + a[r]),
          u(_ >= 0),
          _ > 0)
            ? ((i = t[r - 1]) < t[r] && (i = t[r]),
              u(e.numlines_l[r - 1] + e.numlines_l[r] - 1 > 0),
              (o =
                0 |
                (_ =
                  (20 * (2 * i - _)) /
                  (_ * (e.numlines_l[r - 1] + e.numlines_l[r] - 1)))) > s &&
                (o = s),
              (n[r] = o))
            : (n[r] = 0);
          u(r == e.npart_l - 1);
        }
        var O = [
          -1730326e-23,
          -0.01703172,
          -1349528e-23,
          0.0418072,
          -673278e-22,
          -0.0876324,
          -30835e-21,
          0.1863476,
          -1104424e-22,
          -0.627638,
        ];
        function N(t, a, n, s, r, _, o, l) {
          var f = t.internal_flags;
          if (s < 2) e.fft_long(f, o[l], s, a, n);
          else if (2 == s)
            for (var c = b.BLKSIZE - 1; c >= 0; --c) {
              var u = o[l + 0][c],
                h = o[l + 1][c];
              (o[l + 0][c] = (u + h) * i.SQRT2 * 0.5),
                (o[l + 1][c] = (u - h) * i.SQRT2 * 0.5);
            }
          (_[0] = o[l + 0][0]), (_[0] *= _[0]);
          for (c = b.BLKSIZE / 2 - 1; c >= 0; --c) {
            var m = o[l + 0][b.BLKSIZE / 2 - c],
              p = o[l + 0][b.BLKSIZE / 2 + c];
            _[b.BLKSIZE / 2 - c] = 0.5 * (m * m + p * p);
          }
          var d = 0;
          for (c = 11; c < b.HBLKSIZE; c++) d += _[c];
          if (((f.tot_ener[s] = d), t.analysis)) {
            for (c = 0; c < b.HBLKSIZE; c++)
              (f.pinfo.energy[r][s][c] = f.pinfo.energy_save[s][c]),
                (f.pinfo.energy_save[s][c] = _[c]);
            f.pinfo.pe[r][s] = f.pe[s];
          }
        }
        function X(t, a, n, s, r, _, o, l) {
          var f = t.internal_flags;
          if ((0 == r && s < 2 && e.fft_short(f, o[l], s, a, n), 2 == s))
            for (var c = b.BLKSIZE_s - 1; c >= 0; --c) {
              var u = o[l + 0][r][c],
                h = o[l + 1][r][c];
              (o[l + 0][r][c] = (u + h) * i.SQRT2 * 0.5),
                (o[l + 1][r][c] = (u - h) * i.SQRT2 * 0.5);
            }
          (_[r][0] = o[l + 0][r][0]), (_[r][0] *= _[r][0]);
          for (c = b.BLKSIZE_s / 2 - 1; c >= 0; --c) {
            var m = o[l + 0][r][b.BLKSIZE_s / 2 - c],
              p = o[l + 0][r][b.BLKSIZE_s / 2 + c];
            _[r][b.BLKSIZE_s / 2 - c] = 0.5 * (m * m + p * p);
          }
        }
        function D(e, t, a, s) {
          var r = e.internal_flags;
          2 == e.athaa_loudapprox &&
            a < 2 &&
            ((r.loudness_sq[t][a] = r.loudness_sq_save[a]),
            (r.loudness_sq_save[a] = n(s, r)));
        }
        this.L3psycho_anal_ns = function (e, t, a, n, r, i, h, p, d, v) {
          var S,
            M,
            w,
            R,
            B,
            k,
            I,
            N,
            X,
            D,
            F = e.internal_flags,
            Y = f([2, b.BLKSIZE]),
            q = f([2, 3, b.BLKSIZE_s]),
            C = l(b.CBANDS + 1),
            j = l(b.CBANDS + 1),
            G = l(b.CBANDS + 2),
            z = c(2),
            K = c(2),
            U = f([2, 576]),
            Z = c(b.CBANDS + 2),
            Q = c(b.CBANDS + 2);
          for (
            o.fill(Q, 0),
              S = F.channels_out,
              e.mode == MPEGMode.JOINT_STEREO && (S = 4),
              X =
                e.VBR == s.vbr_off
                  ? 0 == F.ResvMax
                    ? 0
                    : (F.ResvSize / F.ResvMax) * 0.5
                  : e.VBR == s.vbr_rh ||
                    e.VBR == s.vbr_mtrh ||
                    e.VBR == s.vbr_mt
                  ? 0.6
                  : 1,
              M = 0;
            M < F.channels_out;
            M++
          ) {
            var W = t[M],
              J = a + 576 - 350 - 21 + 192;
            for (u(10 == O.length), R = 0; R < 576; R++) {
              var $, ee;
              for ($ = W[J + R + 10], ee = 0, B = 0; B < 9; B += 2)
                ($ += O[B] * (W[J + R + B] + W[J + R + 21 - B])),
                  (ee += O[B + 1] * (W[J + R + B + 1] + W[J + R + 21 - B - 1]));
              U[M][R] = $ + ee;
            }
            r[n][M].en.assign(F.en[M]),
              r[n][M].thm.assign(F.thm[M]),
              S > 2 &&
                (i[n][M].en.assign(F.en[M + 2]),
                i[n][M].thm.assign(F.thm[M + 2]));
          }
          for (M = 0; M < S; M++) {
            var te,
              ae = l(12),
              ne = [0, 0, 0, 0],
              se = l(12),
              re = 1,
              _e = l(b.CBANDS),
              ie = l(b.CBANDS),
              oe = [0, 0, 0, 0],
              le = l(b.HBLKSIZE),
              fe = f([3, b.HBLKSIZE_s]);
            for (
              u(F.npart_s <= b.CBANDS), u(F.npart_l <= b.CBANDS), R = 0;
              R < 3;
              R++
            )
              (ae[R] = F.nsPsy.last_en_subshort[M][R + 6]),
                u(F.nsPsy.last_en_subshort[M][R + 4] > 0),
                (se[R] = ae[R] / F.nsPsy.last_en_subshort[M][R + 4]),
                (ne[0] += ae[R]);
            if (2 == M)
              for (R = 0; R < 576; R++) {
                var ce, ue;
                (ce = U[0][R]),
                  (ue = U[1][R]),
                  (U[0][R] = ce + ue),
                  (U[1][R] = ce - ue);
              }
            var he = U[1 & M],
              be = 0;
            for (R = 0; R < 9; R++) {
              for (var me = be + 64, pe = 1; be < me; be++)
                pe < Math.abs(he[be]) && (pe = Math.abs(he[be]));
              (F.nsPsy.last_en_subshort[M][R] = ae[R + 3] = pe),
                (ne[1 + R / 3] += pe),
                pe > ae[R + 3 - 2]
                  ? (u(ae[R + 3 - 2] > 0), (pe /= ae[R + 3 - 2]))
                  : ae[R + 3 - 2] > 10 * pe
                  ? (u(pe > 0), (pe = ae[R + 3 - 2] / (10 * pe)))
                  : (pe = 0),
                (se[R + 3] = pe);
            }
            if (e.analysis) {
              var de = se[0];
              for (R = 1; R < 12; R++) de < se[R] && (de = se[R]);
              (F.pinfo.ers[n][M] = F.pinfo.ers_save[M]),
                (F.pinfo.ers_save[M] = de);
            }
            for (
              te = 3 == M ? F.nsPsy.attackthre_s : F.nsPsy.attackthre, R = 0;
              R < 12;
              R++
            )
              0 == oe[R / 3] && se[R] > te && (oe[R / 3] = (R % 3) + 1);
            for (R = 1; R < 4; R++) {
              var ve;
              ne[R - 1] > ne[R]
                ? (u(ne[R] > 0), (ve = ne[R - 1] / ne[R]))
                : (u(ne[R - 1] > 0), (ve = ne[R] / ne[R - 1])),
                ve < 1.7 && ((oe[R] = 0), 1 == R && (oe[0] = 0));
            }
            for (
              0 != oe[0] && 0 != F.nsPsy.lastAttacks[M] && (oe[0] = 0),
                (3 != F.nsPsy.lastAttacks[M] &&
                  oe[0] + oe[1] + oe[2] + oe[3] == 0) ||
                  ((re = 0),
                  0 != oe[1] && 0 != oe[0] && (oe[1] = 0),
                  0 != oe[2] && 0 != oe[1] && (oe[2] = 0),
                  0 != oe[3] && 0 != oe[2] && (oe[3] = 0)),
                M < 2 ? (K[M] = re) : 0 == re && (K[0] = K[1] = 0),
                d[M] = F.tot_ener[M],
                m(e, le, fe, Y, 1 & M, q, 1 & M, n, M, t, a),
                V(F, le, C, _e, ie),
                H(F, _e, ie, Z),
                N = 0;
              N < 3;
              N++
            ) {
              var ge, Se;
              for (
                T(e, fe, j, G, M, N), y(F, j, G, M, N), I = 0;
                I < b.SBMAX_s;
                I++
              ) {
                if (
                  ((Se = F.thm[M].s[I][N]),
                  (Se *= 0.8),
                  oe[N] >= 2 || 1 == oe[N + 1])
                ) {
                  var Me = 0 != N ? N - 1 : 2;
                  pe = x(F.thm[M].s[I][Me], Se, 0.6 * X);
                  Se = Math.min(Se, pe);
                }
                if (1 == oe[N]) {
                  (Me = 0 != N ? N - 1 : 2),
                    (pe = x(F.thm[M].s[I][Me], Se, 0.3 * X));
                  Se = Math.min(Se, pe);
                } else if (
                  (0 != N && 3 == oe[N - 1]) ||
                  (0 == N && 3 == F.nsPsy.lastAttacks[M])
                ) {
                  (Me = 2 != N ? N + 1 : 0),
                    (pe = x(F.thm[M].s[I][Me], Se, 0.3 * X));
                  Se = Math.min(Se, pe);
                }
                (ge = ae[3 * N + 3] + ae[3 * N + 4] + ae[3 * N + 5]),
                  6 * ae[3 * N + 5] < ge &&
                    ((Se *= 0.5), 6 * ae[3 * N + 4] < ge && (Se *= 0.5)),
                  (F.thm[M].s[I][N] = Se);
              }
            }
            for (
              F.nsPsy.lastAttacks[M] = oe[2], k = 0, w = 0;
              w < F.npart_l;
              w++
            ) {
              for (
                var we = F.s3ind[w][0],
                  Ae = C[we] * g[Z[we]],
                  Re = F.s3_ll[k++] * Ae;
                ++we <= F.s3ind[w][1];

              )
                (Ae = C[we] * g[Z[we]]),
                  (Re = A(Re, F.s3_ll[k++] * Ae, we, we - w, F, 0));
              (Re *= 0.158489319246111),
                F.blocktype_old[1 & M] == b.SHORT_TYPE
                  ? (G[w] = Re)
                  : (G[w] = x(
                      Math.min(
                        Re,
                        Math.min(2 * F.nb_1[M][w], 16 * F.nb_2[M][w])
                      ),
                      Re,
                      X
                    )),
                (F.nb_2[M][w] = F.nb_1[M][w]),
                (F.nb_1[M][w] = Re);
            }
            for (; w <= b.CBANDS; ++w) (C[w] = 0), (G[w] = 0);
            E(F, C, G, M);
          }
          ((e.mode != MPEGMode.STEREO && e.mode != MPEGMode.JOINT_STEREO) ||
            (e.interChRatio > 0 &&
              (function (e, t) {
                var a = e.internal_flags;
                if (a.channels_out > 1) {
                  for (var n = 0; n < b.SBMAX_l; n++) {
                    var s = a.thm[0].l[n],
                      r = a.thm[1].l[n];
                    (a.thm[0].l[n] += r * t), (a.thm[1].l[n] += s * t);
                  }
                  for (n = 0; n < b.SBMAX_s; n++)
                    for (var _ = 0; _ < 3; _++) {
                      (s = a.thm[0].s[n][_]), (r = a.thm[1].s[n][_]);
                      (a.thm[0].s[n][_] += r * t), (a.thm[1].s[n][_] += s * t);
                    }
                }
              })(e, e.interChRatio)),
          e.mode == MPEGMode.JOINT_STEREO) &&
            (!(function (e) {
              for (var t = 0; t < b.SBMAX_l; t++)
                if (
                  !(
                    e.thm[0].l[t] > 1.58 * e.thm[1].l[t] ||
                    e.thm[1].l[t] > 1.58 * e.thm[0].l[t]
                  )
                ) {
                  var a = e.mld_l[t] * e.en[3].l[t],
                    n = Math.max(e.thm[2].l[t], Math.min(e.thm[3].l[t], a));
                  a = e.mld_l[t] * e.en[2].l[t];
                  var s = Math.max(e.thm[3].l[t], Math.min(e.thm[2].l[t], a));
                  (e.thm[2].l[t] = n), (e.thm[3].l[t] = s);
                }
              for (t = 0; t < b.SBMAX_s; t++)
                for (var r = 0; r < 3; r++)
                  if (
                    !(
                      e.thm[0].s[t][r] > 1.58 * e.thm[1].s[t][r] ||
                      e.thm[1].s[t][r] > 1.58 * e.thm[0].s[t][r]
                    )
                  ) {
                    (a = e.mld_s[t] * e.en[3].s[t][r]),
                      (n = Math.max(
                        e.thm[2].s[t][r],
                        Math.min(e.thm[3].s[t][r], a)
                      ));
                    a = e.mld_s[t] * e.en[2].s[t][r];
                    s = Math.max(
                      e.thm[3].s[t][r],
                      Math.min(e.thm[2].s[t][r], a)
                    );
                    (e.thm[2].s[t][r] = n), (e.thm[3].s[t][r] = s);
                  }
            })(F),
            (D = e.msfix),
            Math.abs(D) > 0 &&
              (function (e, t, a) {
                var n = t,
                  s = Math.pow(10, a);
                (t *= 2), (n *= 2);
                for (var r = 0; r < b.SBMAX_l; r++) {
                  if (
                    ((f = e.ATH.cb_l[e.bm_l[r]] * s),
                    (i = Math.min(
                      Math.max(e.thm[0].l[r], f),
                      Math.max(e.thm[1].l[r], f)
                    )) *
                      t <
                      (o = Math.max(e.thm[2].l[r], f)) +
                        (l = Math.max(e.thm[3].l[r], f)))
                  )
                    u((o *= c = (i * n) / (o + l)) + (l *= c) > 0);
                  (e.thm[2].l[r] = Math.min(o, e.thm[2].l[r])),
                    (e.thm[3].l[r] = Math.min(l, e.thm[3].l[r]));
                }
                for (s *= b.BLKSIZE_s / b.BLKSIZE, r = 0; r < b.SBMAX_s; r++)
                  for (var _ = 0; _ < 3; _++) {
                    var i, o, l, f, c;
                    if (
                      ((f = e.ATH.cb_s[e.bm_s[r]] * s),
                      (i = Math.min(
                        Math.max(e.thm[0].s[r][_], f),
                        Math.max(e.thm[1].s[r][_], f)
                      )) *
                        t <
                        (o = Math.max(e.thm[2].s[r][_], f)) +
                          (l = Math.max(e.thm[3].s[r][_], f)))
                    )
                      u((o *= c = (i * t) / (o + l)) + (l *= c) > 0);
                    (e.thm[2].s[r][_] = Math.min(e.thm[2].s[r][_], o)),
                      (e.thm[3].s[r][_] = Math.min(e.thm[3].s[r][_], l));
                  }
              })(F, D, e.ATHlower * F.ATH.adjust));
          for (
            (function (e, t, a, n) {
              var s = e.internal_flags;
              e.short_blocks != _.short_block_coupled ||
                (0 != t[0] && 0 != t[1]) ||
                (t[0] = t[1] = 0);
              for (var r = 0; r < s.channels_out; r++)
                (n[r] = b.NORM_TYPE),
                  e.short_blocks == _.short_block_dispensed && (t[r] = 1),
                  e.short_blocks == _.short_block_forced && (t[r] = 0),
                  0 != t[r]
                    ? (u(s.blocktype_old[r] != b.START_TYPE),
                      s.blocktype_old[r] == b.SHORT_TYPE &&
                        (n[r] = b.STOP_TYPE))
                    : ((n[r] = b.SHORT_TYPE),
                      s.blocktype_old[r] == b.NORM_TYPE &&
                        (s.blocktype_old[r] = b.START_TYPE),
                      s.blocktype_old[r] == b.STOP_TYPE &&
                        (s.blocktype_old[r] = b.SHORT_TYPE)),
                  (a[r] = s.blocktype_old[r]),
                  (s.blocktype_old[r] = n[r]);
            })(e, K, v, z),
              M = 0;
            M < S;
            M++
          ) {
            var Be,
              ye,
              Ee,
              Te = 0;
            M > 1
              ? ((Be = p),
                (Te = -2),
                (ye = b.NORM_TYPE),
                (v[0] != b.SHORT_TYPE && v[1] != b.SHORT_TYPE) ||
                  (ye = b.SHORT_TYPE),
                (Ee = i[n][M - 2]))
              : ((Be = h), (Te = 0), (ye = v[M]), (Ee = r[n][M])),
              ye == b.SHORT_TYPE
                ? (Be[Te + M] = P(Ee, F.masking_lower))
                : (Be[Te + M] = L(Ee, F.masking_lower)),
              e.analysis && (F.pinfo.pe[n][M] = Be[Te + M]);
          }
          return 0;
        };
        var F = [
          -1730326e-23,
          -0.01703172,
          -1349528e-23,
          0.0418072,
          -673278e-22,
          -0.0876324,
          -30835e-21,
          0.1863476,
          -1104424e-22,
          -0.627638,
        ];
        function Y(e, t, a) {
          if (0 == a)
            for (var n = 0; n < e.npart_s; n++)
              (e.nb_s2[t][n] = e.nb_s1[t][n]), (e.nb_s1[t][n] = 0);
        }
        function q(e, t) {
          for (var a = 0; a < e.npart_l; a++)
            (e.nb_2[t][a] = e.nb_1[t][a]), (e.nb_1[t][a] = 0);
        }
        function C(e, t, a, n, s, r) {
          var _,
            i,
            o,
            f = e.internal_flags,
            c = new float[b.CBANDS](),
            h = l(b.CBANDS),
            m = new int[b.CBANDS]();
          for (o = i = 0; o < f.npart_s; ++o) {
            var p = 0,
              d = 0,
              v = f.numlines_s[o];
            for (_ = 0; _ < v; ++_, ++i) {
              var S = t[r][i];
              (p += S), d < S && (d = S);
            }
            (a[o] = p),
              u(p >= 0),
              (c[o] = d),
              u(v > 0),
              (h[o] = p / v),
              u(h[o] >= 0);
          }
          for (u(o == f.npart_s), u(129 == i); o < b.CBANDS; ++o)
            (c[o] = 0), (h[o] = 0);
          for (
            (function (e, t, a, n) {
              var s = g.length - 1,
                r = 0,
                _ = a[r] + a[r + 1];
              for (
                u(_ >= 0),
                  _ > 0
                    ? ((i = t[r]) < t[r + 1] && (i = t[r + 1]),
                      u(e.numlines_s[r] + e.numlines_s[r + 1] - 1 > 0),
                      (o =
                        0 |
                        (_ =
                          (20 * (2 * i - _)) /
                          (_ * (e.numlines_s[r] + e.numlines_s[r + 1] - 1)))) >
                        s && (o = s),
                      (n[r] = o))
                    : (n[r] = 0),
                  r = 1;
                r < e.npart_s - 1;
                r++
              ) {
                var i, o;
                if (
                  ((_ = a[r - 1] + a[r] + a[r + 1]),
                  u(r + 1 < e.npart_s),
                  u(_ >= 0),
                  _ > 0)
                )
                  (i = t[r - 1]) < t[r] && (i = t[r]),
                    i < t[r + 1] && (i = t[r + 1]),
                    u(
                      e.numlines_s[r - 1] +
                        e.numlines_s[r] +
                        e.numlines_s[r + 1] -
                        1 >
                        0
                    ),
                    (o =
                      0 |
                      (_ =
                        (20 * (3 * i - _)) /
                        (_ *
                          (e.numlines_s[r - 1] +
                            e.numlines_s[r] +
                            e.numlines_s[r + 1] -
                            1)))) > s && (o = s),
                    (n[r] = o);
                else n[r] = 0;
              }
              u(r > 0),
                u(r == e.npart_s - 1),
                (_ = a[r - 1] + a[r]),
                u(_ >= 0),
                _ > 0
                  ? ((i = t[r - 1]) < t[r] && (i = t[r]),
                    u(e.numlines_s[r - 1] + e.numlines_s[r] - 1 > 0),
                    (o =
                      0 |
                      (_ =
                        (20 * (2 * i - _)) /
                        (_ * (e.numlines_s[r - 1] + e.numlines_s[r] - 1)))) >
                      s && (o = s),
                    (n[r] = o))
                  : (n[r] = 0),
                u(r == e.npart_s - 1);
            })(f, c, h, m),
              i = o = 0;
            o < f.npart_s;
            o++
          ) {
            var M,
              w,
              A,
              R,
              y,
              E = f.s3ind_s[o][0],
              T = f.s3ind_s[o][1];
            for (
              M = m[E], w = 1, R = f.s3_ss[i] * a[E] * g[m[E]], ++i, ++E;
              E <= T;

            )
              (M += m[E]),
                (w += 1),
                (R = B(R, (A = f.s3_ss[i] * a[E] * g[m[E]]), E - o)),
                ++i,
                ++E;
            (R *= y = 0.5 * g[(M = (1 + 2 * M) / (2 * w))]),
              (n[o] = R),
              (f.nb_s2[s][o] = f.nb_s1[s][o]),
              (f.nb_s1[s][o] = R),
              (A = c[o]),
              (A *= f.minval_s[o]),
              (A *= y),
              n[o] > A && (n[o] = A),
              f.masking_lower > 1 && (n[o] *= f.masking_lower),
              n[o] > a[o] && (n[o] = a[o]),
              f.masking_lower < 1 && (n[o] *= f.masking_lower),
              u(n[o] >= 0);
          }
          for (; o < b.CBANDS; ++o) (a[o] = 0), (n[o] = 0);
        }
        function j(e, t, a, n, s) {
          var r,
            _ = l(b.CBANDS),
            i = l(b.CBANDS),
            o = c(b.CBANDS + 2);
          V(e, t, a, _, i), H(e, _, i, o);
          var f = 0;
          for (r = 0; r < e.npart_l; r++) {
            var h,
              m,
              p,
              d = e.s3ind[r][0],
              v = e.s3ind[r][1],
              S = 0,
              M = 0;
            for (
              S = o[d], M += 1, m = e.s3_ll[f] * a[d] * g[o[d]], ++f, ++d;
              d <= v;

            )
              (S += o[d]),
                (M += 1),
                (m = B(m, (h = e.s3_ll[f] * a[d] * g[o[d]]), d - r)),
                ++f,
                ++d;
            if (
              ((m *= p = 0.5 * g[(S = (1 + 2 * S) / (2 * M))]),
              e.blocktype_old[1 & s] == b.SHORT_TYPE)
            ) {
              var w = 2 * e.nb_1[s][r];
              n[r] = w > 0 ? Math.min(m, w) : Math.min(m, 0.3 * a[r]);
            } else {
              var A = 16 * e.nb_2[s][r],
                R = 2 * e.nb_1[s][r];
              A <= 0 && (A = m),
                R <= 0 && (R = m),
                (w =
                  e.blocktype_old[1 & s] == b.NORM_TYPE ? Math.min(R, A) : R),
                (n[r] = Math.min(m, w));
            }
            (e.nb_2[s][r] = e.nb_1[s][r]),
              (e.nb_1[s][r] = m),
              (h = _[r]),
              (h *= e.minval_l[r]),
              (h *= p),
              n[r] > h && (n[r] = h),
              e.masking_lower > 1 && (n[r] *= e.masking_lower),
              n[r] > a[r] && (n[r] = a[r]),
              e.masking_lower < 1 && (n[r] *= e.masking_lower),
              u(n[r] >= 0);
          }
          for (; r < b.CBANDS; ++r) (a[r] = 0), (n[r] = 0);
        }
        function G(e, t, a, n, s, r, _) {
          for (
            var i, o, l = 2 * r, f = r > 0 ? Math.pow(10, s) : 1, c = 0;
            c < _;
            ++c
          ) {
            var h = e[2][c],
              b = e[3][c],
              m = t[0][c],
              p = t[1][c],
              d = t[2][c],
              v = t[3][c];
            if (m <= 1.58 * p && p <= 1.58 * m) {
              var g = a[c] * b,
                S = a[c] * h;
              (o = Math.max(d, Math.min(v, g))),
                (i = Math.max(v, Math.min(d, S)));
            } else (o = d), (i = v);
            if (r > 0) {
              var M,
                w,
                A = n[c] * f;
              if (
                ((M = Math.min(Math.max(m, A), Math.max(p, A))),
                (w = (d = Math.max(o, A)) + (v = Math.max(i, A))) > 0 &&
                  M * l < w)
              ) {
                var R = (M * l) / w;
                (d *= R), (v *= R), u(w > 0);
              }
              (o = Math.min(d, o)), (i = Math.min(v, i));
            }
            o > h && (o = h), i > b && (i = b), (t[2][c] = o), (t[3][c] = i);
          }
        }
        function z(e, t) {
          var a;
          return (a = e >= 0 ? 27 * -e : e * t) <= -72
            ? 0
            : Math.exp(0.2302585093 * a);
        }
        function K(e) {
          var t,
            a,
            n = 0;
          for (n = 0; z(n, e) > 1e-20; n -= 1);
          for (s = n, r = 0; Math.abs(r - s) > 1e-12; )
            z((n = (r + s) / 2), e) > 0 ? (r = n) : (s = n);
          t = s;
          var s, r;
          n = 0;
          for (n = 0; z(n, e) > 1e-20; n += 1);
          for (s = 0, r = n; Math.abs(r - s) > 1e-12; )
            z((n = (r + s) / 2), e) > 0 ? (s = n) : (r = n);
          a = r;
          var _,
            i = 0;
          for (_ = 0; _ <= 1e3; ++_) {
            i += z((n = t + (_ * (a - t)) / 1e3), e);
          }
          return 1001 / (i * (a - t));
        }
        function U(e) {
          return (
            e < 0 && (e = 0),
            (e *= 0.001),
            13 * Math.atan(0.76 * e) + 3.5 * Math.atan((e * e) / 56.25)
          );
        }
        function Z(e, t, a, n, s, r, _, i, o, f, h, m) {
          var p,
            d = l(b.CBANDS + 1),
            v = i / (m > 15 ? 1152 : 384),
            g = c(b.HBLKSIZE);
          i /= o;
          var S = 0,
            M = 0;
          for (p = 0; p < b.CBANDS; p++) {
            var w;
            for (
              P = U(i * S), d[p] = i * S, w = S;
              U(i * w) - P < 0.34 && w <= o / 2;
              w++
            );
            for (e[p] = w - S, M = p + 1; S < w; )
              u(S < b.HBLKSIZE), (g[S++] = p);
            if (S > o / 2) {
              (S = o / 2), ++p;
              break;
            }
          }
          u(p < b.CBANDS), (d[p] = i * S);
          for (var A = 0; A < m; A++) {
            var R, B, y, E, T;
            (y = f[A]),
              (E = f[A + 1]),
              (R = 0 | Math.floor(0.5 + h * (y - 0.5))) < 0 && (R = 0),
              (B = 0 | Math.floor(0.5 + h * (E - 0.5))) > o / 2 && (B = o / 2),
              (a[A] = (g[R] + g[B]) / 2),
              (t[A] = g[B]);
            var x = v * E;
            (_[A] = (x - d[t[A]]) / (d[t[A] + 1] - d[t[A]])),
              _[A] < 0 ? (_[A] = 0) : _[A] > 1 && (_[A] = 1),
              (T = U(i * f[A] * h)),
              (T = Math.min(T, 15.5) / 15.5),
              (r[A] = Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * T)) - 2.5));
          }
          S = 0;
          for (var k = 0; k < M; k++) {
            var P,
              I,
              L = e[k];
            (P = U(i * S)),
              (I = U(i * (S + L - 1))),
              (n[k] = 0.5 * (P + I)),
              (P = U(i * (S - 0.5))),
              (I = U(i * (S + L - 0.5))),
              (s[k] = I - P),
              (S += L);
          }
          return M;
        }
        function Q(e, t, a, n, s, r) {
          var _,
            i,
            o,
            c,
            u,
            h,
            m = f([b.CBANDS, b.CBANDS]),
            p = 0;
          if (r)
            for (var d = 0; d < t; d++)
              for (_ = 0; _ < t; _++) {
                var v =
                  ((i = a[d] - a[_]),
                  (o = void 0),
                  (c = void 0),
                  (u = void 0),
                  (h = void 0),
                  (o = i),
                  (c =
                    (o *= o >= 0 ? 3 : 1.5) >= 0.5 && o <= 2.5
                      ? 8 * ((h = o - 0.5) * h - 2 * h)
                      : 0),
                  ((u =
                    15.811389 +
                    7.5 * (o += 0.474) -
                    17.5 * Math.sqrt(1 + o * o)) <= -60
                    ? 0
                    : ((o = Math.exp(0.2302585093 * (c + u))),
                      (o /= 0.6609193))) * n[_]);
                m[d][_] = v * s[d];
              }
          else
            for (_ = 0; _ < t; _++) {
              var g = 15 + Math.min(21 / a[_], 12),
                S = K(g);
              for (d = 0; d < t; d++) {
                v = S * z(a[d] - a[_], g) * n[_];
                m[d][_] = v * s[d];
              }
            }
          for (d = 0; d < t; d++) {
            for (_ = 0; _ < t && !(m[d][_] > 0); _++);
            for (e[d][0] = _, _ = t - 1; _ > 0 && !(m[d][_] > 0); _--);
            (e[d][1] = _), (p += e[d][1] - e[d][0] + 1);
          }
          var M = l(p),
            w = 0;
          for (d = 0; d < t; d++)
            for (_ = e[d][0]; _ <= e[d][1]; _++) M[w++] = m[d][_];
          return M;
        }
        function W(e) {
          var t = U(e);
          return (
            (t = Math.min(t, 15.5) / 15.5),
            Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * t)) - 2.5)
          );
        }
        function J(e, t) {
          return (
            e < -0.3 && (e = 3410),
            (e /= 1e3),
            (e = Math.max(0.1, e)),
            3.64 * Math.pow(e, -0.8) -
              6.8 * Math.exp(-0.6 * Math.pow(e - 3.4, 2)) +
              6 * Math.exp(-0.15 * Math.pow(e - 8.7, 2)) +
              0.001 * (0.6 + 0.04 * t) * Math.pow(e, 4)
          );
        }
        (this.L3psycho_anal_vbr = function (e, t, a, n, s, r, i, o, h, m) {
          var p = e.internal_flags,
            d = l(b.HBLKSIZE),
            v = f([3, b.HBLKSIZE_s]),
            g = f([2, b.BLKSIZE]),
            S = f([2, 3, b.BLKSIZE_s]),
            M = f([4, b.CBANDS]),
            w = f([4, b.CBANDS]),
            A = f([4, 3]),
            R = [
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
            ],
            B = c(2),
            T = e.mode == MPEGMode.JOINT_STEREO ? 4 : p.channels_out;
          !(function (e, t, a, n, s, r, _, i, o, c) {
            for (
              var h = f([2, 576]),
                b = e.internal_flags,
                m = b.channels_out,
                p = e.mode == MPEGMode.JOINT_STEREO ? 4 : m,
                d = 0;
              d < m;
              d++
            ) {
              firbuf = t[d];
              var v = a + 576 - 350 - 21 + 192;
              u(10 == F.length);
              for (var g = 0; g < 576; g++) {
                var S, M;
                (S = firbuf[v + g + 10]), (M = 0);
                for (var w = 0; w < 9; w += 2)
                  (S += F[w] * (firbuf[v + g + w] + firbuf[v + g + 21 - w])),
                    (M +=
                      F[w + 1] *
                      (firbuf[v + g + w + 1] + firbuf[v + g + 21 - w - 1]));
                h[d][g] = S + M;
              }
              s[n][d].en.assign(b.en[d]),
                s[n][d].thm.assign(b.thm[d]),
                p > 2 &&
                  (r[n][d].en.assign(b.en[d + 2]),
                  r[n][d].thm.assign(b.thm[d + 2]));
            }
            for (d = 0; d < p; d++) {
              var A = l(12),
                R = l(12),
                B = [0, 0, 0, 0],
                y = h[1 & d],
                E = 0,
                T = 3 == d ? b.nsPsy.attackthre_s : b.nsPsy.attackthre,
                x = 1;
              if (2 == d)
                for (g = 0, w = 576; w > 0; ++g, --w) {
                  var k = h[0][g],
                    P = h[1][g];
                  (h[0][g] = k + P), (h[1][g] = k - P);
                }
              for (g = 0; g < 3; g++)
                (R[g] = b.nsPsy.last_en_subshort[d][g + 6]),
                  u(b.nsPsy.last_en_subshort[d][g + 4] > 0),
                  (A[g] = R[g] / b.nsPsy.last_en_subshort[d][g + 4]),
                  (B[0] += R[g]);
              for (g = 0; g < 9; g++) {
                for (var I = E + 64, L = 1; E < I; E++)
                  L < Math.abs(y[E]) && (L = Math.abs(y[E]));
                (b.nsPsy.last_en_subshort[d][g] = R[g + 3] = L),
                  (B[1 + g / 3] += L),
                  L > R[g + 3 - 2]
                    ? (u(R[g + 3 - 2] > 0), (L /= R[g + 3 - 2]))
                    : R[g + 3 - 2] > 10 * L
                    ? (u(L > 0), (L = R[g + 3 - 2] / (10 * L)))
                    : (L = 0),
                  (A[g + 3] = L);
              }
              for (g = 0; g < 3; ++g) {
                var V = R[3 * g + 3] + R[3 * g + 4] + R[3 * g + 5],
                  H = 1;
                6 * R[3 * g + 5] < V &&
                  ((H *= 0.5), 6 * R[3 * g + 4] < V && (H *= 0.5)),
                  (i[d][g] = H);
              }
              if (e.analysis) {
                var O = A[0];
                for (g = 1; g < 12; g++) O < A[g] && (O = A[g]);
                (b.pinfo.ers[n][d] = b.pinfo.ers_save[d]),
                  (b.pinfo.ers_save[d] = O);
              }
              for (g = 0; g < 12; g++)
                0 == o[d][g / 3] && A[g] > T && (o[d][g / 3] = (g % 3) + 1);
              for (g = 1; g < 4; g++) {
                var N = B[g - 1],
                  X = B[g];
                Math.max(N, X) < 4e4 &&
                  N < 1.7 * X &&
                  X < 1.7 * N &&
                  (1 == g && o[d][0] <= o[d][g] && (o[d][0] = 0),
                  (o[d][g] = 0));
              }
              o[d][0] <= b.nsPsy.lastAttacks[d] && (o[d][0] = 0),
                (3 != b.nsPsy.lastAttacks[d] &&
                  o[d][0] + o[d][1] + o[d][2] + o[d][3] == 0) ||
                  ((x = 0),
                  0 != o[d][1] && 0 != o[d][0] && (o[d][1] = 0),
                  0 != o[d][2] && 0 != o[d][1] && (o[d][2] = 0),
                  0 != o[d][3] && 0 != o[d][2] && (o[d][3] = 0)),
                d < 2 ? (c[d] = x) : 0 == x && (c[0] = c[1] = 0),
                (_[d] = b.tot_ener[d]);
            }
          })(e, t, a, n, s, r, h, A, R, B),
            (function (e, t) {
              var a = e.internal_flags;
              e.short_blocks != _.short_block_coupled ||
                (0 != t[0] && 0 != t[1]) ||
                (t[0] = t[1] = 0);
              for (var n = 0; n < a.channels_out; n++)
                e.short_blocks == _.short_block_dispensed && (t[n] = 1),
                  e.short_blocks == _.short_block_forced && (t[n] = 0);
            })(e, B);
          for (var k = 0; k < T; k++) {
            N(e, t, a, k, n, d, g, (V = 1 & k)),
              D(e, n, k, d),
              0 != B[V] ? j(p, d, M[k], w[k], k) : q(p, k);
          }
          B[0] + B[1] == 2 &&
            e.mode == MPEGMode.JOINT_STEREO &&
            G(
              M,
              w,
              p.mld_cb_l,
              p.ATH.cb_l,
              e.ATHlower * p.ATH.adjust,
              e.msfix,
              p.npart_l
            );
          for (k = 0; k < T; k++) {
            0 != B[(V = 1 & k)] && E(p, M[k], w[k], k);
          }
          for (var I = 0; I < 3; I++) {
            for (k = 0; k < T; ++k) {
              0 != B[(V = 1 & k)]
                ? Y(p, k, I)
                : (X(e, t, a, k, I, v, S, V), C(e, v, M[k], w[k], k, I));
            }
            B[0] + B[1] == 0 &&
              e.mode == MPEGMode.JOINT_STEREO &&
              G(
                M,
                w,
                p.mld_cb_s,
                p.ATH.cb_s,
                e.ATHlower * p.ATH.adjust,
                e.msfix,
                p.npart_s
              );
            for (k = 0; k < T; ++k) {
              0 == B[(V = 1 & k)] && y(p, M[k], w[k], k, I);
            }
          }
          for (k = 0; k < T; k++) {
            var V;
            if (0 == B[(V = 1 & k)])
              for (var H = 0; H < b.SBMAX_s; H++) {
                var O = l(3);
                for (I = 0; I < 3; I++) {
                  var z = p.thm[k].s[H][I];
                  if (((z *= 0.8), R[k][I] >= 2 || 1 == R[k][I + 1])) {
                    var K = 0 != I ? I - 1 : 2,
                      U = x(p.thm[k].s[H][K], z, 0.36);
                    z = Math.min(z, U);
                  } else if (1 == R[k][I]) {
                    (K = 0 != I ? I - 1 : 2),
                      (U = x(p.thm[k].s[H][K], z, 0.18));
                    z = Math.min(z, U);
                  } else if (
                    (0 != I && 3 == R[k][I - 1]) ||
                    (0 == I && 3 == p.nsPsy.lastAttacks[k])
                  ) {
                    (K = 2 != I ? I + 1 : 0),
                      (U = x(p.thm[k].s[H][K], z, 0.18));
                    z = Math.min(z, U);
                  }
                  (z *= A[k][I]), (O[I] = z);
                }
                for (I = 0; I < 3; I++) p.thm[k].s[H][I] = O[I];
              }
          }
          for (k = 0; k < T; k++) p.nsPsy.lastAttacks[k] = R[k][2];
          !(function (e, t, a) {
            for (var n = e.internal_flags, s = 0; s < n.channels_out; s++) {
              var r = b.NORM_TYPE;
              0 != t[s]
                ? (u(n.blocktype_old[s] != b.START_TYPE),
                  n.blocktype_old[s] == b.SHORT_TYPE && (r = b.STOP_TYPE))
                : ((r = b.SHORT_TYPE),
                  n.blocktype_old[s] == b.NORM_TYPE &&
                    (n.blocktype_old[s] = b.START_TYPE),
                  n.blocktype_old[s] == b.STOP_TYPE &&
                    (n.blocktype_old[s] = b.SHORT_TYPE)),
                (a[s] = n.blocktype_old[s]),
                (n.blocktype_old[s] = r);
            }
          })(e, B, m);
          for (k = 0; k < T; k++) {
            var Z, Q, W, J;
            k > 1
              ? ((Z = o),
                (Q = -2),
                (W = b.NORM_TYPE),
                (m[0] != b.SHORT_TYPE && m[1] != b.SHORT_TYPE) ||
                  (W = b.SHORT_TYPE),
                (J = r[n][k - 2]))
              : ((Z = i), (Q = 0), (W = m[k]), (J = s[n][k])),
              W == b.SHORT_TYPE
                ? (Z[Q + k] = P(J, p.masking_lower))
                : (Z[Q + k] = L(J, p.masking_lower)),
              e.analysis && (p.pinfo.pe[n][k] = Z[Q + k]);
          }
          return 0;
        }),
          (this.psymodel_init = function (a) {
            var n,
              _ = a.internal_flags,
              i = !0,
              o = 13,
              f = 0,
              c = 0,
              h = -8.25,
              m = -4.5,
              g = l(b.CBANDS),
              S = l(b.CBANDS),
              M = l(b.CBANDS),
              w = a.out_samplerate;
            switch (a.experimentalZ) {
              default:
              case 0:
                i = !0;
                break;
              case 1:
                i = a.VBR != s.vbr_mtrh && a.VBR != s.vbr_mt;
                break;
              case 2:
                i = !1;
                break;
              case 3:
                (o = 8), (f = -1.75), (c = -0.0125), (h = -8.25), (m = -2.25);
            }
            for (
              _.ms_ener_ratio_old = 0.25,
                _.blocktype_old[0] = _.blocktype_old[1] = b.NORM_TYPE,
                n = 0;
              n < 4;
              ++n
            ) {
              for (var A = 0; A < b.CBANDS; ++A)
                (_.nb_1[n][A] = 1e20),
                  (_.nb_2[n][A] = 1e20),
                  (_.nb_s1[n][A] = _.nb_s2[n][A] = 1);
              for (var R = 0; R < b.SBMAX_l; R++)
                (_.en[n].l[R] = 1e20), (_.thm[n].l[R] = 1e20);
              for (A = 0; A < 3; ++A) {
                for (R = 0; R < b.SBMAX_s; R++)
                  (_.en[n].s[R][A] = 1e20), (_.thm[n].s[R][A] = 1e20);
                _.nsPsy.lastAttacks[n] = 0;
              }
              for (A = 0; A < 9; A++) _.nsPsy.last_en_subshort[n][A] = 10;
            }
            for (
              _.loudness_sq_save[0] = _.loudness_sq_save[1] = 0,
                _.npart_l = Z(
                  _.numlines_l,
                  _.bo_l,
                  _.bm_l,
                  g,
                  S,
                  _.mld_l,
                  _.PSY.bo_l_weight,
                  w,
                  b.BLKSIZE,
                  _.scalefac_band.l,
                  b.BLKSIZE / 1152,
                  b.SBMAX_l
                ),
                u(_.npart_l < b.CBANDS),
                n = 0;
              n < _.npart_l;
              n++
            ) {
              var B = f;
              g[n] >= o &&
                (B =
                  (c * (g[n] - o)) / (24 - o) + (f * (24 - g[n])) / (24 - o)),
                (M[n] = Math.pow(10, B / 10)),
                _.numlines_l[n] > 0
                  ? (_.rnumlines_l[n] = 1 / _.numlines_l[n])
                  : (_.rnumlines_l[n] = 0);
            }
            _.s3_ll = Q(_.s3ind, _.npart_l, g, S, M, i);
            var y;
            A = 0;
            for (n = 0; n < _.npart_l; n++) {
              x = r.MAX_VALUE;
              for (var E = 0; E < _.numlines_l[n]; E++, A++) {
                var T = (w * A) / (1e3 * b.BLKSIZE);
                (k = this.ATHformula(1e3 * T, a) - 20),
                  (k = Math.pow(10, 0.1 * k)),
                  x > (k *= _.numlines_l[n]) && (x = k);
              }
              (_.ATH.cb_l[n] = x),
                (x = (20 * g[n]) / 10 - 20) > 6 && (x = 100),
                x < -15 && (x = -15),
                (x -= 8),
                (_.minval_l[n] = Math.pow(10, x / 10) * _.numlines_l[n]);
            }
            for (
              _.npart_s = Z(
                _.numlines_s,
                _.bo_s,
                _.bm_s,
                g,
                S,
                _.mld_s,
                _.PSY.bo_s_weight,
                w,
                b.BLKSIZE_s,
                _.scalefac_band.s,
                b.BLKSIZE_s / 384,
                b.SBMAX_s
              ),
                u(_.npart_s < b.CBANDS),
                A = 0,
                n = 0;
              n < _.npart_s;
              n++
            ) {
              var x;
              B = h;
              g[n] >= o &&
                (B =
                  (m * (g[n] - o)) / (24 - o) + (h * (24 - g[n])) / (24 - o)),
                (M[n] = Math.pow(10, B / 10)),
                (x = r.MAX_VALUE);
              for (E = 0; E < _.numlines_s[n]; E++, A++) {
                var k;
                T = (w * A) / (1e3 * b.BLKSIZE_s);
                (k = this.ATHformula(1e3 * T, a) - 20),
                  (k = Math.pow(10, 0.1 * k)),
                  x > (k *= _.numlines_s[n]) && (x = k);
              }
              (_.ATH.cb_s[n] = x),
                (x = (7 * g[n]) / 12 - 7),
                g[n] > 12 && (x *= 1 + 3.1 * Math.log(1 + x)),
                g[n] < 12 && (x *= 1 + 2.3 * Math.log(1 - x)),
                x < -15 && (x = -15),
                (x -= 8),
                (_.minval_s[n] = Math.pow(10, x / 10) * _.numlines_s[n]);
            }
            (_.s3_ss = Q(_.s3ind_s, _.npart_s, g, S, M, i)),
              (p = Math.pow(10, 9 / 16)),
              (d = Math.pow(10, 1.5)),
              (v = Math.pow(10, 1.5)),
              e.init_fft(_),
              (_.decay = Math.exp((-1 * t) / ((0.01 * w) / 192))),
              (y = 3.5),
              0 != (2 & a.exp_nspsytune) && (y = 1),
              Math.abs(a.msfix) > 0 && (y = a.msfix),
              (a.msfix = y);
            for (var P = 0; P < _.npart_l; P++)
              _.s3ind[P][1] > _.npart_l - 1 && (_.s3ind[P][1] = _.npart_l - 1);
            var I = (576 * _.mode_gr) / w;
            if (
              ((_.ATH.decay = Math.pow(10, -1.2 * I)),
              (_.ATH.adjust = 0.01),
              (_.ATH.adjustLimit = 1),
              u(_.bo_l[b.SBMAX_l - 1] <= _.npart_l),
              u(_.bo_s[b.SBMAX_s - 1] <= _.npart_s),
              -1 != a.ATHtype)
            ) {
              var L = a.out_samplerate / b.BLKSIZE,
                V = 0;
              for (T = 0, n = 0; n < b.BLKSIZE / 2; ++n)
                (T += L),
                  (_.ATH.eql_w[n] =
                    1 / Math.pow(10, this.ATHformula(T, a) / 10)),
                  (V += _.ATH.eql_w[n]);
              for (V = 1 / V, n = b.BLKSIZE / 2; --n >= 0; )
                _.ATH.eql_w[n] *= V;
            }
            for (P = A = 0; P < _.npart_s; ++P)
              for (n = 0; n < _.numlines_s[P]; ++n) ++A;
            u(129 == A);
            for (P = A = 0; P < _.npart_l; ++P)
              for (n = 0; n < _.numlines_l[P]; ++n) ++A;
            for (u(513 == A), A = 0, n = 0; n < _.npart_l; n++) {
              T = (w * (A + _.numlines_l[n] / 2)) / (1 * b.BLKSIZE);
              (_.mld_cb_l[n] = W(T)), (A += _.numlines_l[n]);
            }
            for (; n < b.CBANDS; ++n) _.mld_cb_l[n] = 1;
            for (A = 0, n = 0; n < _.npart_s; n++) {
              T = (w * (A + _.numlines_s[n] / 2)) / (1 * b.BLKSIZE_s);
              (_.mld_cb_s[n] = W(T)), (A += _.numlines_s[n]);
            }
            for (; n < b.CBANDS; ++n) _.mld_cb_s[n] = 1;
            return 0;
          }),
          (this.ATHformula = function (e, t) {
            var a;
            switch (t.ATHtype) {
              case 0:
                a = J(e, 9);
                break;
              case 1:
                a = J(e, -1);
                break;
              case 2:
                a = J(e, 0);
                break;
              case 3:
                a = J(e, 1) + 6;
                break;
              case 4:
                a = J(e, t.ATHcurve);
                break;
              default:
                a = J(e, 0);
            }
            return a;
          });
      };
    },
    function (e, t, a) {
      var n = a(0),
        s = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util),
        r = (n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
        _ = (n.new_float_n, n.new_int, n.new_int_n, n.assert, a(1));
      e.exports = function () {
        var e = r(_.BLKSIZE),
          t = r(_.BLKSIZE_s / 2),
          a = [
            0.9238795325112867,
            0.3826834323650898,
            0.9951847266721969,
            0.0980171403295606,
            0.9996988186962042,
            0.02454122852291229,
            0.9999811752826011,
            0.006135884649154475,
          ];
        function n(e, t, n) {
          var r,
            _,
            i,
            o = 0,
            l = t + (n <<= 1);
          r = 4;
          do {
            var f, c, u, h, b, m, p;
            (p = r >> 1),
              (m = (b = r << 1) + (h = r)),
              (r = b << 1),
              (i = (_ = t) + p);
            do {
              (A = e[_ + 0] - e[_ + h]),
                (w = e[_ + 0] + e[_ + h]),
                (E = e[_ + b] - e[_ + m]),
                (B = e[_ + b] + e[_ + m]),
                (e[_ + b] = w - B),
                (e[_ + 0] = w + B),
                (e[_ + m] = A - E),
                (e[_ + h] = A + E),
                (A = e[i + 0] - e[i + h]),
                (w = e[i + 0] + e[i + h]),
                (E = s.SQRT2 * e[i + m]),
                (B = s.SQRT2 * e[i + b]),
                (e[i + b] = w - B),
                (e[i + 0] = w + B),
                (e[i + m] = A - E),
                (e[i + h] = A + E),
                (i += r),
                (_ += r);
            } while (_ < l);
            for (c = a[o + 0], f = a[o + 1], u = 1; u < p; u++) {
              var d, v;
              (d = 1 - 2 * f * f),
                (v = 2 * f * c),
                (_ = t + u),
                (i = t + h - u);
              do {
                var g, S, M, w, A, R, B, y, E, T;
                (S = v * e[_ + h] - d * e[i + h]),
                  (g = d * e[_ + h] + v * e[i + h]),
                  (A = e[_ + 0] - g),
                  (w = e[_ + 0] + g),
                  (R = e[i + 0] - S),
                  (M = e[i + 0] + S),
                  (S = v * e[_ + m] - d * e[i + m]),
                  (g = d * e[_ + m] + v * e[i + m]),
                  (E = e[_ + b] - g),
                  (B = e[_ + b] + g),
                  (T = e[i + b] - S),
                  (y = e[i + b] + S),
                  (S = f * B - c * T),
                  (g = c * B + f * T),
                  (e[_ + b] = w - g),
                  (e[_ + 0] = w + g),
                  (e[i + m] = R - S),
                  (e[i + h] = R + S),
                  (S = c * y - f * E),
                  (g = f * y + c * E),
                  (e[i + b] = M - g),
                  (e[i + 0] = M + g),
                  (e[_ + m] = A - S),
                  (e[_ + h] = A + S),
                  (i += r),
                  (_ += r);
              } while (_ < l);
              (c = (d = c) * a[o + 0] - f * a[o + 1]),
                (f = d * a[o + 1] + f * a[o + 0]);
            }
            o += 2;
          } while (r < n);
        }
        var i = [
          0,
          128,
          64,
          192,
          32,
          160,
          96,
          224,
          16,
          144,
          80,
          208,
          48,
          176,
          112,
          240,
          8,
          136,
          72,
          200,
          40,
          168,
          104,
          232,
          24,
          152,
          88,
          216,
          56,
          184,
          120,
          248,
          4,
          132,
          68,
          196,
          36,
          164,
          100,
          228,
          20,
          148,
          84,
          212,
          52,
          180,
          116,
          244,
          12,
          140,
          76,
          204,
          44,
          172,
          108,
          236,
          28,
          156,
          92,
          220,
          60,
          188,
          124,
          252,
          2,
          130,
          66,
          194,
          34,
          162,
          98,
          226,
          18,
          146,
          82,
          210,
          50,
          178,
          114,
          242,
          10,
          138,
          74,
          202,
          42,
          170,
          106,
          234,
          26,
          154,
          90,
          218,
          58,
          186,
          122,
          250,
          6,
          134,
          70,
          198,
          38,
          166,
          102,
          230,
          22,
          150,
          86,
          214,
          54,
          182,
          118,
          246,
          14,
          142,
          78,
          206,
          46,
          174,
          110,
          238,
          30,
          158,
          94,
          222,
          62,
          190,
          126,
          254,
        ];
        (this.fft_short = function (e, a, s, r, o) {
          for (var l = 0; l < 3; l++) {
            var f = _.BLKSIZE_s / 2,
              c = 65535 & (192 * (l + 1)),
              u = _.BLKSIZE_s / 8 - 1;
            do {
              var h,
                b,
                m,
                p,
                d,
                v = 255 & i[u << 2];
              (b =
                (h = t[v] * r[s][o + v + c]) -
                (d = t[127 - v] * r[s][o + v + c + 128])),
                (h += d),
                (p =
                  (m = t[v + 64] * r[s][o + v + c + 64]) -
                  (d = t[63 - v] * r[s][o + v + c + 192])),
                (m += d),
                (f -= 4),
                (a[l][f + 0] = h + m),
                (a[l][f + 2] = h - m),
                (a[l][f + 1] = b + p),
                (a[l][f + 3] = b - p),
                (b =
                  (h = t[v + 1] * r[s][o + v + c + 1]) -
                  (d = t[126 - v] * r[s][o + v + c + 129])),
                (h += d),
                (p =
                  (m = t[v + 65] * r[s][o + v + c + 65]) -
                  (d = t[62 - v] * r[s][o + v + c + 193])),
                (m += d),
                (a[l][f + _.BLKSIZE_s / 2 + 0] = h + m),
                (a[l][f + _.BLKSIZE_s / 2 + 2] = h - m),
                (a[l][f + _.BLKSIZE_s / 2 + 1] = b + p),
                (a[l][f + _.BLKSIZE_s / 2 + 3] = b - p);
            } while (--u >= 0);
            n(a[l], f, _.BLKSIZE_s / 2);
          }
        }),
          (this.fft_long = function (t, a, s, r, o) {
            var l = _.BLKSIZE / 8 - 1,
              f = _.BLKSIZE / 2;
            do {
              var c,
                u,
                h,
                b,
                m,
                p = 255 & i[l];
              (u =
                (c = e[p] * r[s][o + p]) -
                (m = e[p + 512] * r[s][o + p + 512])),
                (c += m),
                (b =
                  (h = e[p + 256] * r[s][o + p + 256]) -
                  (m = e[p + 768] * r[s][o + p + 768])),
                (h += m),
                (a[(f -= 4) + 0] = c + h),
                (a[f + 2] = c - h),
                (a[f + 1] = u + b),
                (a[f + 3] = u - b),
                (u =
                  (c = e[p + 1] * r[s][o + p + 1]) -
                  (m = e[p + 513] * r[s][o + p + 513])),
                (c += m),
                (b =
                  (h = e[p + 257] * r[s][o + p + 257]) -
                  (m = e[p + 769] * r[s][o + p + 769])),
                (h += m),
                (a[f + _.BLKSIZE / 2 + 0] = c + h),
                (a[f + _.BLKSIZE / 2 + 2] = c - h),
                (a[f + _.BLKSIZE / 2 + 1] = u + b),
                (a[f + _.BLKSIZE / 2 + 3] = u - b);
            } while (--l >= 0);
            n(a, f, _.BLKSIZE / 2);
          }),
          (this.init_fft = function (a) {
            for (var n = 0; n < _.BLKSIZE; n++)
              e[n] =
                0.42 -
                0.5 * Math.cos((2 * Math.PI * (n + 0.5)) / _.BLKSIZE) +
                0.08 * Math.cos((4 * Math.PI * (n + 0.5)) / _.BLKSIZE);
            for (n = 0; n < _.BLKSIZE_s / 2; n++)
              t[n] =
                0.5 * (1 - Math.cos((2 * Math.PI * (n + 0.5)) / _.BLKSIZE_s));
          });
      };
    },
    function (e, t, a) {
      var n = a(0),
        s = n.System,
        r = (n.VbrMode, n.Float, n.ShortBlock, n.Util),
        _ = n.Arrays,
        i = (n.new_array_n, n.new_byte, n.new_double, n.new_float),
        o = (n.new_float_n, n.new_int, n.new_int_n, n.assert, a(1));
      e.exports = function () {
        var e = [
            -0.1482523854003001,
            32.308141959636465,
            296.40344946382766,
            883.1344870032432,
            11113.947376231741,
            1057.2713659324597,
            305.7402417275812,
            30.825928907280012,
            3.8533188138216365,
            59.42900443849514,
            709.5899960123345,
            5281.91112291017,
            -5829.66483675846,
            -817.6293103748613,
            -76.91656988279972,
            -4.594269939176596,
            0.9063471690191471,
            0.1960342806591213,
            -0.15466694054279598,
            34.324387823855965,
            301.8067566458425,
            817.599602898885,
            11573.795901679885,
            1181.2520595540152,
            321.59731579894424,
            31.232021761053772,
            3.7107095756221318,
            53.650946155329365,
            684.167428119626,
            5224.56624370173,
            -6366.391851890084,
            -908.9766368219582,
            -89.83068876699639,
            -5.411397422890401,
            0.8206787908286602,
            0.3901806440322567,
            -0.16070888947830023,
            36.147034243915876,
            304.11815768187864,
            732.7429163887613,
            11989.60988270091,
            1300.012278487897,
            335.28490093152146,
            31.48816102859945,
            3.373875931311736,
            47.232241542899175,
            652.7371796173471,
            5132.414255594984,
            -6909.087078780055,
            -1001.9990371107289,
            -103.62185754286375,
            -6.104916304710272,
            0.7416505462720353,
            0.5805693545089249,
            -0.16636367662261495,
            37.751650073343995,
            303.01103387567713,
            627.9747488785183,
            12358.763425278165,
            1412.2779918482834,
            346.7496836825721,
            31.598286663170416,
            3.1598635433980946,
            40.57878626349686,
            616.1671130880391,
            5007.833007176154,
            -7454.040671756168,
            -1095.7960341867115,
            -118.24411666465777,
            -6.818469345853504,
            0.6681786379192989,
            0.7653668647301797,
            -0.1716176790982088,
            39.11551877123304,
            298.3413246578966,
            503.5259106886539,
            12679.589408408976,
            1516.5821921214542,
            355.9850766329023,
            31.395241710249053,
            2.9164211881972335,
            33.79716964664243,
            574.8943997801362,
            4853.234992253242,
            -7997.57021486075,
            -1189.7624067269965,
            -133.6444792601766,
            -7.7202770609839915,
            0.5993769336819237,
            0.9427934736519954,
            -0.17645823955292173,
            40.21879108166477,
            289.9982036694474,
            359.3226160751053,
            12950.259102786438,
            1612.1013903507662,
            362.85067106591504,
            31.045922092242872,
            2.822222032597987,
            26.988862316190684,
            529.8996541764288,
            4671.371946949588,
            -8535.899136645805,
            -1282.5898586244496,
            -149.58553632943463,
            -8.643494270763135,
            0.5345111359507916,
            1.111140466039205,
            -0.36174739330527045,
            41.04429910497807,
            277.5463268268618,
            195.6386023135583,
            13169.43812144731,
            1697.6433561479398,
            367.40983966190305,
            30.557037410382826,
            2.531473372857427,
            20.070154905927314,
            481.50208566532336,
            4464.970341588308,
            -9065.36882077239,
            -1373.62841526722,
            -166.1660487028118,
            -9.58289321133207,
            0.4729647758913199,
            1.268786568327291,
            -0.36970682634889585,
            41.393213350082036,
            261.2935935556502,
            12.935476055240873,
            13336.131683328815,
            1772.508612059496,
            369.76534388639965,
            29.751323653701338,
            2.4023193045459172,
            13.304795348228817,
            430.5615775526625,
            4237.0568611071185,
            -9581.931701634761,
            -1461.6913552409758,
            -183.12733958476446,
            -10.718010163869403,
            0.41421356237309503,
            1.414213562373095,
            -0.37677560326535325,
            41.619486213528496,
            241.05423794991074,
            -187.94665032361226,
            13450.063605744153,
            1836.153896465782,
            369.4908799925761,
            29.001847876923147,
            2.0714759319987186,
            6.779591200894186,
            377.7767837205709,
            3990.386575512536,
            -10081.709459700915,
            -1545.947424837898,
            -200.3762958015653,
            -11.864482073055006,
            0.3578057213145241,
            1.546020906725474,
            -0.3829366947518991,
            41.1516456456653,
            216.47684307105183,
            -406.1569483347166,
            13511.136535077321,
            1887.8076599260432,
            367.3025214564151,
            28.136213436723654,
            1.913880671464418,
            0.3829366947518991,
            323.85365704338597,
            3728.1472257487526,
            -10561.233882199509,
            -1625.2025997821418,
            -217.62525175416,
            -13.015432208941645,
            0.3033466836073424,
            1.66293922460509,
            -0.5822628872992417,
            40.35639251440489,
            188.20071124269245,
            -640.2706748618148,
            13519.21490106562,
            1927.6022433578062,
            362.8197642637487,
            26.968821921868447,
            1.7463817695935329,
            -5.62650678237171,
            269.3016715297017,
            3453.386536448852,
            -11016.145278780888,
            -1698.6569643425091,
            -234.7658734267683,
            -14.16351421663124,
            0.2504869601913055,
            1.76384252869671,
            -0.5887180101749253,
            39.23429103868072,
            155.76096234403798,
            -889.2492977967378,
            13475.470561874661,
            1955.0535223723712,
            356.4450994756727,
            25.894952980042156,
            1.5695032905781554,
            -11.181939564328772,
            214.80884394039484,
            3169.1640829158237,
            -11443.321309975563,
            -1765.1588461316153,
            -251.68908574481912,
            -15.49755935939164,
            0.198912367379658,
            1.847759065022573,
            -0.7912582233652842,
            37.39369355329111,
            119.699486012458,
            -1151.0956593239027,
            13380.446257078214,
            1970.3952110853447,
            348.01959814116185,
            24.731487364283044,
            1.3850130831637748,
            -16.421408865300393,
            161.05030052864092,
            2878.3322807850063,
            -11838.991423510031,
            -1823.985884688674,
            -268.2854986386903,
            -16.81724543849939,
            0.1483359875383474,
            1.913880671464418,
            -0.7960642926861912,
            35.2322109610459,
            80.01928065061526,
            -1424.0212633405113,
            13235.794061869668,
            1973.804052543835,
            337.9908651258184,
            23.289159354463873,
            1.3934255946442087,
            -21.099669467133474,
            108.48348407242611,
            2583.700758091299,
            -12199.726194855148,
            -1874.2780658979746,
            -284.2467154529415,
            -18.11369784385905,
            0.09849140335716425,
            1.961570560806461,
            -0.998795456205172,
            32.56307803611191,
            36.958364584370486,
            -1706.075448829146,
            13043.287458812016,
            1965.3831106103316,
            326.43182772364605,
            22.175018750622293,
            1.198638339011324,
            -25.371248002043963,
            57.53505923036915,
            2288.41886619975,
            -12522.674544337233,
            -1914.8400385312243,
            -299.26241273417224,
            -19.37805630698734,
            0.04912684976946725,
            1.990369453344394,
            (0.035780907 * r.SQRT2 * 0.5) / 2384e-9,
            (0.017876148 * r.SQRT2 * 0.5) / 2384e-9,
            (0.003134727 * r.SQRT2 * 0.5) / 2384e-9,
            (0.002457142 * r.SQRT2 * 0.5) / 2384e-9,
            (971317e-9 * r.SQRT2 * 0.5) / 2384e-9,
            (218868e-9 * r.SQRT2 * 0.5) / 2384e-9,
            (101566e-9 * r.SQRT2 * 0.5) / 2384e-9,
            (13828e-9 * r.SQRT2 * 0.5) / 2384e-9,
            12804.797818791945,
            1945.5515939597317,
            313.4244966442953,
            49591e-9 / 2384e-9,
            1995.1556208053692,
            21458e-9 / 2384e-9,
            -69618e-9 / 2384e-9,
          ],
          t = [
            [
              2382191739347913e-28,
              6423305872147834e-28,
              9400849094049688e-28,
              1122435026096556e-27,
              1183840321267481e-27,
              1122435026096556e-27,
              940084909404969e-27,
              6423305872147839e-28,
              2382191739347918e-28,
              5456116108943412e-27,
              4878985199565852e-27,
              4240448995017367e-27,
              3559909094758252e-27,
              2858043359288075e-27,
              2156177623817898e-27,
              1475637723558783e-27,
              8371015190102974e-28,
              2599706096327376e-28,
              -5456116108943412e-27,
              -4878985199565852e-27,
              -4240448995017367e-27,
              -3559909094758252e-27,
              -2858043359288076e-27,
              -2156177623817898e-27,
              -1475637723558783e-27,
              -8371015190102975e-28,
              -2599706096327376e-28,
              -2382191739347923e-28,
              -6423305872147843e-28,
              -9400849094049696e-28,
              -1122435026096556e-27,
              -1183840321267481e-27,
              -1122435026096556e-27,
              -9400849094049694e-28,
              -642330587214784e-27,
              -2382191739347918e-28,
            ],
            [
              2382191739347913e-28,
              6423305872147834e-28,
              9400849094049688e-28,
              1122435026096556e-27,
              1183840321267481e-27,
              1122435026096556e-27,
              9400849094049688e-28,
              6423305872147841e-28,
              2382191739347918e-28,
              5456116108943413e-27,
              4878985199565852e-27,
              4240448995017367e-27,
              3559909094758253e-27,
              2858043359288075e-27,
              2156177623817898e-27,
              1475637723558782e-27,
              8371015190102975e-28,
              2599706096327376e-28,
              -5461314069809755e-27,
              -4921085770524055e-27,
              -4343405037091838e-27,
              -3732668368707687e-27,
              -3093523840190885e-27,
              -2430835727329465e-27,
              -1734679010007751e-27,
              -974825365660928e-27,
              -2797435120168326e-28,
              0,
              0,
              0,
              0,
              0,
              0,
              -2283748241799531e-28,
              -4037858874020686e-28,
              -2146547464825323e-28,
            ],
            [
              0.1316524975873958,
              0.414213562373095,
              0.7673269879789602,
              1.091308501069271,
              1.303225372841206,
              1.56968557711749,
              1.920982126971166,
              2.414213562373094,
              3.171594802363212,
              4.510708503662055,
              7.595754112725146,
              22.90376554843115,
              0.984807753012208,
              0.6427876096865394,
              0.3420201433256688,
              0.9396926207859084,
              -0.1736481776669303,
              -0.7660444431189779,
              0.8660254037844387,
              0.5,
              -0.5144957554275265,
              -0.4717319685649723,
              -0.3133774542039019,
              -0.1819131996109812,
              -0.09457419252642064,
              -0.04096558288530405,
              -0.01419856857247115,
              -0.003699974673760037,
              0.8574929257125442,
              0.8817419973177052,
              0.9496286491027329,
              0.9833145924917901,
              0.9955178160675857,
              0.9991605581781475,
              0.999899195244447,
              0.9999931550702802,
            ],
            [
              0,
              0,
              0,
              0,
              0,
              0,
              2283748241799531e-28,
              4037858874020686e-28,
              2146547464825323e-28,
              5461314069809755e-27,
              4921085770524055e-27,
              4343405037091838e-27,
              3732668368707687e-27,
              3093523840190885e-27,
              2430835727329466e-27,
              1734679010007751e-27,
              974825365660928e-27,
              2797435120168326e-28,
              -5456116108943413e-27,
              -4878985199565852e-27,
              -4240448995017367e-27,
              -3559909094758253e-27,
              -2858043359288075e-27,
              -2156177623817898e-27,
              -1475637723558782e-27,
              -8371015190102975e-28,
              -2599706096327376e-28,
              -2382191739347913e-28,
              -6423305872147834e-28,
              -9400849094049688e-28,
              -1122435026096556e-27,
              -1183840321267481e-27,
              -1122435026096556e-27,
              -9400849094049688e-28,
              -6423305872147841e-28,
              -2382191739347918e-28,
            ],
          ],
          a = t[o.SHORT_TYPE],
          n = t[o.SHORT_TYPE],
          l = t[o.SHORT_TYPE],
          f = t[o.SHORT_TYPE],
          c = [
            0,
            1,
            16,
            17,
            8,
            9,
            24,
            25,
            4,
            5,
            20,
            21,
            12,
            13,
            28,
            29,
            2,
            3,
            18,
            19,
            10,
            11,
            26,
            27,
            6,
            7,
            22,
            23,
            14,
            15,
            30,
            31,
          ];
        function u(t, a, n) {
          for (
            var s, _, i, o = 10, l = a + 238 - 14 - 286, f = -15;
            f < 0;
            f++
          ) {
            var c, u, h;
            (c = e[o + -10]),
              (u = t[l + -224] * c),
              (h = t[a + 224] * c),
              (c = e[o + -9]),
              (u += t[l + -160] * c),
              (h += t[a + 160] * c),
              (c = e[o + -8]),
              (u += t[l + -96] * c),
              (h += t[a + 96] * c),
              (c = e[o + -7]),
              (u += t[l + -32] * c),
              (h += t[a + 32] * c),
              (c = e[o + -6]),
              (u += t[l + 32] * c),
              (h += t[a + -32] * c),
              (c = e[o + -5]),
              (u += t[l + 96] * c),
              (h += t[a + -96] * c),
              (c = e[o + -4]),
              (u += t[l + 160] * c),
              (h += t[a + -160] * c),
              (c = e[o + -3]),
              (u += t[l + 224] * c),
              (h += t[a + -224] * c),
              (c = e[o + -2]),
              (u += t[a + -256] * c),
              (h -= t[l + 256] * c),
              (c = e[o + -1]),
              (u += t[a + -192] * c),
              (h -= t[l + 192] * c),
              (c = e[o + 0]),
              (u += t[a + -128] * c),
              (h -= t[l + 128] * c),
              (c = e[o + 1]),
              (u += t[a + -64] * c),
              (h -= t[l + 64] * c),
              (c = e[o + 2]),
              (u += t[a + 0] * c),
              (h -= t[l + 0] * c),
              (c = e[o + 3]),
              (u += t[a + 64] * c),
              (h -= t[l + -64] * c),
              (c = e[o + 4]),
              (u += t[a + 128] * c),
              (h -= t[l + -128] * c),
              (c = e[o + 5]),
              (u += t[a + 192] * c),
              (c = (h -= t[l + -192] * c) - (u *= e[o + 6])),
              (n[30 + 2 * f] = h + u),
              (n[31 + 2 * f] = e[o + 7] * c),
              (o += 18),
              a--,
              l++;
          }
          (h = t[a + -16] * e[o + -10]),
            (u = t[a + -32] * e[o + -2]),
            (h += (t[a + -48] - t[a + 16]) * e[o + -9]),
            (u += t[a + -96] * e[o + -1]),
            (h += (t[a + -80] + t[a + 48]) * e[o + -8]),
            (u += t[a + -160] * e[o + 0]),
            (h += (t[a + -112] - t[a + 80]) * e[o + -7]),
            (u += t[a + -224] * e[o + 1]),
            (h += (t[a + -144] + t[a + 112]) * e[o + -6]),
            (u -= t[a + 32] * e[o + 2]),
            (h += (t[a + -176] - t[a + 144]) * e[o + -5]),
            (u -= t[a + 96] * e[o + 3]),
            (h += (t[a + -208] + t[a + 176]) * e[o + -4]),
            (u -= t[a + 160] * e[o + 4]),
            (h += (t[a + -240] - t[a + 208]) * e[o + -3]),
            (s = (u -= t[a + 224]) - h),
            (_ = u + h),
            (h = n[14]),
            (u = n[15] - h),
            (n[31] = _ + h),
            (n[30] = s + u),
            (n[15] = s - u),
            (n[14] = _ - h),
            (i = n[28] - n[0]),
            (n[0] += n[28]),
            (n[28] = i * e[o + -36 + 7]),
            (i = n[29] - n[1]),
            (n[1] += n[29]),
            (n[29] = i * e[o + -36 + 7]),
            (i = n[26] - n[2]),
            (n[2] += n[26]),
            (n[26] = i * e[o + -72 + 7]),
            (i = n[27] - n[3]),
            (n[3] += n[27]),
            (n[27] = i * e[o + -72 + 7]),
            (i = n[24] - n[4]),
            (n[4] += n[24]),
            (n[24] = i * e[o + -108 + 7]),
            (i = n[25] - n[5]),
            (n[5] += n[25]),
            (n[25] = i * e[o + -108 + 7]),
            (i = n[22] - n[6]),
            (n[6] += n[22]),
            (n[22] = i * r.SQRT2),
            (i = n[23] - n[7]),
            (n[7] += n[23]),
            (n[23] = i * r.SQRT2 - n[7]),
            (n[7] -= n[6]),
            (n[22] -= n[7]),
            (n[23] -= n[22]),
            (i = n[6]),
            (n[6] = n[31] - i),
            (n[31] = n[31] + i),
            (i = n[7]),
            (n[7] = n[30] - i),
            (n[30] = n[30] + i),
            (i = n[22]),
            (n[22] = n[15] - i),
            (n[15] = n[15] + i),
            (i = n[23]),
            (n[23] = n[14] - i),
            (n[14] = n[14] + i),
            (i = n[20] - n[8]),
            (n[8] += n[20]),
            (n[20] = i * e[o + -180 + 7]),
            (i = n[21] - n[9]),
            (n[9] += n[21]),
            (n[21] = i * e[o + -180 + 7]),
            (i = n[18] - n[10]),
            (n[10] += n[18]),
            (n[18] = i * e[o + -216 + 7]),
            (i = n[19] - n[11]),
            (n[11] += n[19]),
            (n[19] = i * e[o + -216 + 7]),
            (i = n[16] - n[12]),
            (n[12] += n[16]),
            (n[16] = i * e[o + -252 + 7]),
            (i = n[17] - n[13]),
            (n[13] += n[17]),
            (n[17] = i * e[o + -252 + 7]),
            (i = -n[20] + n[24]),
            (n[20] += n[24]),
            (n[24] = i * e[o + -216 + 7]),
            (i = -n[21] + n[25]),
            (n[21] += n[25]),
            (n[25] = i * e[o + -216 + 7]),
            (i = n[4] - n[8]),
            (n[4] += n[8]),
            (n[8] = i * e[o + -216 + 7]),
            (i = n[5] - n[9]),
            (n[5] += n[9]),
            (n[9] = i * e[o + -216 + 7]),
            (i = n[0] - n[12]),
            (n[0] += n[12]),
            (n[12] = i * e[o + -72 + 7]),
            (i = n[1] - n[13]),
            (n[1] += n[13]),
            (n[13] = i * e[o + -72 + 7]),
            (i = n[16] - n[28]),
            (n[16] += n[28]),
            (n[28] = i * e[o + -72 + 7]),
            (i = -n[17] + n[29]),
            (n[17] += n[29]),
            (n[29] = i * e[o + -72 + 7]),
            (i = r.SQRT2 * (n[2] - n[10])),
            (n[2] += n[10]),
            (n[10] = i),
            (i = r.SQRT2 * (n[3] - n[11])),
            (n[3] += n[11]),
            (n[11] = i),
            (i = r.SQRT2 * (-n[18] + n[26])),
            (n[18] += n[26]),
            (n[26] = i - n[18]),
            (i = r.SQRT2 * (-n[19] + n[27])),
            (n[19] += n[27]),
            (n[27] = i - n[19]),
            (i = n[2]),
            (n[19] -= n[3]),
            (n[3] -= i),
            (n[2] = n[31] - i),
            (n[31] += i),
            (i = n[3]),
            (n[11] -= n[19]),
            (n[18] -= i),
            (n[3] = n[30] - i),
            (n[30] += i),
            (i = n[18]),
            (n[27] -= n[11]),
            (n[19] -= i),
            (n[18] = n[15] - i),
            (n[15] += i),
            (i = n[19]),
            (n[10] -= i),
            (n[19] = n[14] - i),
            (n[14] += i),
            (i = n[10]),
            (n[11] -= i),
            (n[10] = n[23] - i),
            (n[23] += i),
            (i = n[11]),
            (n[26] -= i),
            (n[11] = n[22] - i),
            (n[22] += i),
            (i = n[26]),
            (n[27] -= i),
            (n[26] = n[7] - i),
            (n[7] += i),
            (i = n[27]),
            (n[27] = n[6] - i),
            (n[6] += i),
            (i = r.SQRT2 * (n[0] - n[4])),
            (n[0] += n[4]),
            (n[4] = i),
            (i = r.SQRT2 * (n[1] - n[5])),
            (n[1] += n[5]),
            (n[5] = i),
            (i = r.SQRT2 * (n[16] - n[20])),
            (n[16] += n[20]),
            (n[20] = i),
            (i = r.SQRT2 * (n[17] - n[21])),
            (n[17] += n[21]),
            (n[21] = i),
            (i = -r.SQRT2 * (n[8] - n[12])),
            (n[8] += n[12]),
            (n[12] = i - n[8]),
            (i = -r.SQRT2 * (n[9] - n[13])),
            (n[9] += n[13]),
            (n[13] = i - n[9]),
            (i = -r.SQRT2 * (n[25] - n[29])),
            (n[25] += n[29]),
            (n[29] = i - n[25]),
            (i = -r.SQRT2 * (n[24] + n[28])),
            (n[24] -= n[28]),
            (n[28] = i - n[24]),
            (i = n[24] - n[16]),
            (n[24] = i),
            (i = n[20] - i),
            (n[20] = i),
            (i = n[28] - i),
            (n[28] = i),
            (i = n[25] - n[17]),
            (n[25] = i),
            (i = n[21] - i),
            (n[21] = i),
            (i = n[29] - i),
            (n[29] = i),
            (i = n[17] - n[1]),
            (n[17] = i),
            (i = n[9] - i),
            (n[9] = i),
            (i = n[25] - i),
            (n[25] = i),
            (i = n[5] - i),
            (n[5] = i),
            (i = n[21] - i),
            (n[21] = i),
            (i = n[13] - i),
            (n[13] = i),
            (i = n[29] - i),
            (n[29] = i),
            (i = n[1] - n[0]),
            (n[1] = i),
            (i = n[16] - i),
            (n[16] = i),
            (i = n[17] - i),
            (n[17] = i),
            (i = n[8] - i),
            (n[8] = i),
            (i = n[9] - i),
            (n[9] = i),
            (i = n[24] - i),
            (n[24] = i),
            (i = n[25] - i),
            (n[25] = i),
            (i = n[4] - i),
            (n[4] = i),
            (i = n[5] - i),
            (n[5] = i),
            (i = n[20] - i),
            (n[20] = i),
            (i = n[21] - i),
            (n[21] = i),
            (i = n[12] - i),
            (n[12] = i),
            (i = n[13] - i),
            (n[13] = i),
            (i = n[28] - i),
            (n[28] = i),
            (i = n[29] - i),
            (n[29] = i),
            (i = n[0]),
            (n[0] += n[31]),
            (n[31] -= i),
            (i = n[1]),
            (n[1] += n[30]),
            (n[30] -= i),
            (i = n[16]),
            (n[16] += n[15]),
            (n[15] -= i),
            (i = n[17]),
            (n[17] += n[14]),
            (n[14] -= i),
            (i = n[8]),
            (n[8] += n[23]),
            (n[23] -= i),
            (i = n[9]),
            (n[9] += n[22]),
            (n[22] -= i),
            (i = n[24]),
            (n[24] += n[7]),
            (n[7] -= i),
            (i = n[25]),
            (n[25] += n[6]),
            (n[6] -= i),
            (i = n[4]),
            (n[4] += n[27]),
            (n[27] -= i),
            (i = n[5]),
            (n[5] += n[26]),
            (n[26] -= i),
            (i = n[20]),
            (n[20] += n[11]),
            (n[11] -= i),
            (i = n[21]),
            (n[21] += n[10]),
            (n[10] -= i),
            (i = n[12]),
            (n[12] += n[19]),
            (n[19] -= i),
            (i = n[13]),
            (n[13] += n[18]),
            (n[18] -= i),
            (i = n[28]),
            (n[28] += n[3]),
            (n[3] -= i),
            (i = n[29]),
            (n[29] += n[2]),
            (n[2] -= i);
        }
        function h(e, a) {
          for (var n = 0; n < 3; n++) {
            var s, r, _, i, l, f;
            (r =
              (i = e[a + 6] * t[o.SHORT_TYPE][0] - e[a + 15]) +
              (s = e[a + 0] * t[o.SHORT_TYPE][2] - e[a + 9])),
              (_ = i - s),
              (l =
                (i = e[a + 15] * t[o.SHORT_TYPE][0] + e[a + 6]) +
                (s = e[a + 9] * t[o.SHORT_TYPE][2] + e[a + 0])),
              (f = -i + s),
              (s =
                2069978111953089e-26 *
                (e[a + 3] * t[o.SHORT_TYPE][1] - e[a + 12])),
              (i =
                2069978111953089e-26 *
                (e[a + 12] * t[o.SHORT_TYPE][1] + e[a + 3])),
              (e[a + 0] = 190752519173728e-25 * r + s),
              (e[a + 15] = 190752519173728e-25 * -l + i),
              (_ = 0.8660254037844387 * _ * 1907525191737281e-26),
              (l = 0.5 * l * 1907525191737281e-26 + i),
              (e[a + 3] = _ - l),
              (e[a + 6] = _ + l),
              (r = 0.5 * r * 1907525191737281e-26 - s),
              (f = 0.8660254037844387 * f * 1907525191737281e-26),
              (e[a + 9] = r + f),
              (e[a + 12] = r - f),
              a++;
          }
        }
        this.mdct_sub48 = function (e, r, b) {
          for (
            var m,
              p,
              d,
              v,
              g,
              S,
              M,
              w,
              A,
              R,
              B,
              y,
              E,
              T,
              x,
              k,
              P,
              I,
              L,
              V,
              H,
              O = r,
              N = 286,
              X = 0;
            X < e.channels_out;
            X++
          ) {
            for (var D = 0; D < e.mode_gr; D++) {
              for (
                var F,
                  Y = e.l3_side.tt[D][X],
                  q = Y.xr,
                  C = 0,
                  j = e.sb_sample[X][1 - D],
                  G = 0,
                  z = 0;
                z < 9;
                z++
              )
                for (
                  u(O, N, j[G]), u(O, N + 32, j[G + 1]), G += 2, N += 64, F = 1;
                  F < 32;
                  F += 2
                )
                  j[G - 1][F] *= -1;
              for (F = 0; F < 32; F++, C += 18) {
                var K = Y.block_type,
                  U = e.sb_sample[X][D],
                  Z = e.sb_sample[X][1 - D];
                if (
                  (0 != Y.mixed_block_flag && F < 2 && (K = 0),
                  e.amp_filter[F] < 1e-12)
                )
                  _.fill(q, C + 0, C + 18, 0);
                else {
                  if (e.amp_filter[F] < 1)
                    for (z = 0; z < 18; z++) Z[z][c[F]] *= e.amp_filter[F];
                  if (K == o.SHORT_TYPE) {
                    for (z = -3; z < 0; z++) {
                      var Q = t[o.SHORT_TYPE][z + 3];
                      (q[C + 3 * z + 9] = U[9 + z][c[F]] * Q - U[8 - z][c[F]]),
                        (q[C + 3 * z + 18] =
                          U[14 - z][c[F]] * Q + U[15 + z][c[F]]),
                        (q[C + 3 * z + 10] =
                          U[15 + z][c[F]] * Q - U[14 - z][c[F]]),
                        (q[C + 3 * z + 19] =
                          Z[2 - z][c[F]] * Q + Z[3 + z][c[F]]),
                        (q[C + 3 * z + 11] =
                          Z[3 + z][c[F]] * Q - Z[2 - z][c[F]]),
                        (q[C + 3 * z + 20] =
                          Z[8 - z][c[F]] * Q + Z[9 + z][c[F]]);
                    }
                    h(q, C);
                  } else {
                    var W = i(18);
                    for (z = -9; z < 0; z++) {
                      var J, $;
                      (J =
                        t[K][z + 27] * Z[z + 9][c[F]] +
                        t[K][z + 36] * Z[8 - z][c[F]]),
                        ($ =
                          t[K][z + 9] * U[z + 9][c[F]] -
                          t[K][z + 18] * U[8 - z][c[F]]),
                        (W[z + 9] = J - $ * a[3 + z + 9]),
                        (W[z + 18] = J * a[3 + z + 9] + $);
                    }
                    (m = q),
                      (p = C),
                      (v = void 0),
                      (g = void 0),
                      (S = void 0),
                      (M = void 0),
                      (w = void 0),
                      (A = void 0),
                      (R = void 0),
                      (B = void 0),
                      (y = void 0),
                      (E = void 0),
                      (T = void 0),
                      (x = void 0),
                      (k = void 0),
                      (P = void 0),
                      (I = void 0),
                      (L = void 0),
                      (V = void 0),
                      (H = void 0),
                      (S = (d = W)[17] - d[9]),
                      (w = d[15] - d[11]),
                      (A = d[14] - d[12]),
                      (R = d[0] + d[8]),
                      (B = d[1] + d[7]),
                      (y = d[2] + d[6]),
                      (E = d[3] + d[5]),
                      (m[p + 17] = R + y - E - (B - d[4])),
                      (g = (R + y - E) * n[19] + (B - d[4])),
                      (v = (S - w - A) * n[18]),
                      (m[p + 5] = v + g),
                      (m[p + 6] = v - g),
                      (M = (d[16] - d[10]) * n[18]),
                      (B = B * n[19] + d[4]),
                      (v = S * n[12] + M + w * n[13] + A * n[14]),
                      (g = -R * n[16] + B - y * n[17] + E * n[15]),
                      (m[p + 1] = v + g),
                      (m[p + 2] = v - g),
                      (v = S * n[13] - M - w * n[14] + A * n[12]),
                      (g = -R * n[17] + B - y * n[15] + E * n[16]),
                      (m[p + 9] = v + g),
                      (m[p + 10] = v - g),
                      (v = S * n[14] - M + w * n[12] - A * n[13]),
                      (g = R * n[15] - B + y * n[16] - E * n[17]),
                      (m[p + 13] = v + g),
                      (m[p + 14] = v - g),
                      (T = d[8] - d[0]),
                      (k = d[6] - d[2]),
                      (P = d[5] - d[3]),
                      (I = d[17] + d[9]),
                      (L = d[16] + d[10]),
                      (V = d[15] + d[11]),
                      (H = d[14] + d[12]),
                      (m[p + 0] = I + V + H + (L + d[13])),
                      (v = (I + V + H) * n[19] - (L + d[13])),
                      (g = (T - k + P) * n[18]),
                      (m[p + 11] = v + g),
                      (m[p + 12] = v - g),
                      (x = (d[7] - d[1]) * n[18]),
                      (L = d[13] - L * n[19]),
                      (v = I * n[15] - L + V * n[16] + H * n[17]),
                      (g = T * n[14] + x + k * n[12] + P * n[13]),
                      (m[p + 3] = v + g),
                      (m[p + 4] = v - g),
                      (v = -I * n[17] + L - V * n[15] - H * n[16]),
                      (g = T * n[13] + x - k * n[14] - P * n[12]),
                      (m[p + 7] = v + g),
                      (m[p + 8] = v - g),
                      (v = -I * n[16] + L - V * n[17] - H * n[15]),
                      (g = T * n[12] - x + k * n[13] - P * n[14]),
                      (m[p + 15] = v + g),
                      (m[p + 16] = v - g);
                  }
                }
                if (K != o.SHORT_TYPE && 0 != F)
                  for (z = 7; z >= 0; --z) {
                    var ee, te;
                    (ee = q[C + z] * l[20 + z] + q[C + -1 - z] * f[28 + z]),
                      (te = q[C + z] * f[28 + z] - q[C + -1 - z] * l[20 + z]),
                      (q[C + -1 - z] = ee),
                      (q[C + z] = te);
                  }
              }
            }
            if (((O = b), (N = 286), 1 == e.mode_gr))
              for (var ae = 0; ae < 18; ae++)
                s.arraycopy(
                  e.sb_sample[X][1][ae],
                  0,
                  e.sb_sample[X][0][ae],
                  0,
                  32
                );
          }
        };
      };
    },
    function (e, t, a) {
      var n = a(6);
      e.exports = function () {
        (this.thm = new n()), (this.en = new n());
      };
    },
    function (e, t, a) {
      var n = a(7);
      e.exports = function () {
        (this.class_id = 0),
          (this.num_samples = 0),
          (this.num_channels = 0),
          (this.in_samplerate = 0),
          (this.out_samplerate = 0),
          (this.scale = 0),
          (this.scale_left = 0),
          (this.scale_right = 0),
          (this.analysis = !1),
          (this.bWriteVbrTag = !1),
          (this.decode_only = !1),
          (this.quality = 0),
          (this.mode = n.STEREO),
          (this.force_ms = !1),
          (this.free_format = !1),
          (this.findReplayGain = !1),
          (this.decode_on_the_fly = !1),
          (this.write_id3tag_automatic = !1),
          (this.brate = 0),
          (this.compression_ratio = 0),
          (this.copyright = 0),
          (this.original = 0),
          (this.extension = 0),
          (this.emphasis = 0),
          (this.error_protection = 0),
          (this.strict_ISO = !1),
          (this.disable_reservoir = !1),
          (this.quant_comp = 0),
          (this.quant_comp_short = 0),
          (this.experimentalY = !1),
          (this.experimentalZ = 0),
          (this.exp_nspsytune = 0),
          (this.preset = 0),
          (this.VBR = null),
          (this.VBR_q_frac = 0),
          (this.VBR_q = 0),
          (this.VBR_mean_bitrate_kbps = 0),
          (this.VBR_min_bitrate_kbps = 0),
          (this.VBR_max_bitrate_kbps = 0),
          (this.VBR_hard_min = 0),
          (this.lowpassfreq = 0),
          (this.highpassfreq = 0),
          (this.lowpasswidth = 0),
          (this.highpasswidth = 0),
          (this.maskingadjust = 0),
          (this.maskingadjust_short = 0),
          (this.ATHonly = !1),
          (this.ATHshort = !1),
          (this.noATH = !1),
          (this.ATHtype = 0),
          (this.ATHcurve = 0),
          (this.ATHlower = 0),
          (this.athaa_type = 0),
          (this.athaa_loudapprox = 0),
          (this.athaa_sensitivity = 0),
          (this.short_blocks = null),
          (this.useTemporal = !1),
          (this.interChRatio = 0),
          (this.msfix = 0),
          (this.tune = !1),
          (this.tune_value_a = 0),
          (this.version = 0),
          (this.encoder_delay = 0),
          (this.encoder_padding = 0),
          (this.framesize = 0),
          (this.frameNum = 0),
          (this.lame_allocated_gfp = 0),
          (this.internal_flags = null);
      };
    },
    function (e, t, a) {
      var n = a(0),
        s =
          (n.System,
          n.VbrMode,
          n.Float,
          n.ShortBlock,
          n.Util,
          n.Arrays,
          n.new_array_n,
          n.new_byte,
          n.new_double,
          n.new_float,
          n.new_float_n,
          n.new_int),
        r = (n.new_int_n, n.assert, a(4));
      e.exports = function () {
        (this.tt = [
          [null, null],
          [null, null],
        ]),
          (this.main_data_begin = 0),
          (this.private_bits = 0),
          (this.resvDrain_pre = 0),
          (this.resvDrain_post = 0),
          (this.scfsi = [s(4), s(4)]);
        for (var e = 0; e < 2; e++)
          for (var t = 0; t < 2; t++) this.tt[e][t] = new r();
      };
    },
    function (e, t, a) {
      var n = a(0),
        s =
          (n.System,
          n.VbrMode,
          n.Float,
          n.ShortBlock,
          n.Util,
          n.Arrays,
          n.new_array_n,
          n.new_byte,
          n.new_double,
          n.new_float),
        r = n.new_float_n,
        _ = n.new_int,
        i = (n.new_int_n, n.assert, a(1));
      e.exports = function () {
        (this.last_en_subshort = r([4, 9])),
          (this.lastAttacks = _(4)),
          (this.pefirbuf = s(19)),
          (this.longfact = s(i.SBMAX_l)),
          (this.shortfact = s(i.SBMAX_s)),
          (this.attackthre = 0),
          (this.attackthre_s = 0);
      };
    },
    function (e, t) {
      e.exports = function () {
        (this.sum = 0),
          (this.seen = 0),
          (this.want = 0),
          (this.pos = 0),
          (this.size = 0),
          (this.bag = null),
          (this.nVbrNumFrames = 0),
          (this.nBytesWritten = 0),
          (this.TotalFrameSize = 0);
      };
    },
    function (e, t, a) {
      var n = a(0),
        s =
          (n.System,
          n.VbrMode,
          n.Float,
          n.ShortBlock,
          n.Util,
          n.Arrays,
          n.new_array_n,
          n.new_byte,
          n.new_double,
          n.new_float),
        r = (n.new_float_n, n.new_int, n.new_int_n, n.assert, a(1));
      e.exports = function () {
        (this.useAdjust = 0),
          (this.aaSensitivityP = 0),
          (this.adjust = 0),
          (this.adjustLimit = 0),
          (this.decay = 0),
          (this.floor = 0),
          (this.l = s(r.SBMAX_l)),
          (this.s = s(r.SBMAX_s)),
          (this.psfb21 = s(r.PSFB21)),
          (this.psfb12 = s(r.PSFB12)),
          (this.cb_l = s(r.CBANDS)),
          (this.cb_s = s(r.CBANDS)),
          (this.eql_w = s(r.BLKSIZE / 2));
      };
    },
    function (e, t, a) {
      var n = a(0),
        s =
          (n.System,
          n.VbrMode,
          n.Float,
          n.ShortBlock,
          n.Util,
          n.Arrays,
          n.new_array_n,
          n.new_byte,
          n.new_double,
          n.new_float),
        r = (n.new_float_n, n.new_int),
        _ = (n.new_int_n, n.assert, a(9));
      e.exports = function () {
        (this.linprebuf = s(2 * _.MAX_ORDER)),
          (this.linpre = 0),
          (this.lstepbuf = s(_.MAX_SAMPLES_PER_WINDOW + _.MAX_ORDER)),
          (this.lstep = 0),
          (this.loutbuf = s(_.MAX_SAMPLES_PER_WINDOW + _.MAX_ORDER)),
          (this.lout = 0),
          (this.rinprebuf = s(2 * _.MAX_ORDER)),
          (this.rinpre = 0),
          (this.rstepbuf = s(_.MAX_SAMPLES_PER_WINDOW + _.MAX_ORDER)),
          (this.rstep = 0),
          (this.routbuf = s(_.MAX_SAMPLES_PER_WINDOW + _.MAX_ORDER)),
          (this.rout = 0),
          (this.sampleWindow = 0),
          (this.totsamp = 0),
          (this.lsum = 0),
          (this.rsum = 0),
          (this.freqindex = 0),
          (this.first = 0),
          (this.A = r(0 | (_.STEPS_per_dB * _.MAX_dB))),
          (this.B = r(0 | (_.STEPS_per_dB * _.MAX_dB)));
      };
    },
    function (e, t, a) {
      var n = a(0),
        s =
          (n.System,
          n.VbrMode,
          n.Float,
          n.ShortBlock,
          n.Util,
          n.Arrays,
          n.new_array_n,
          n.new_byte,
          n.new_double,
          n.new_float),
        r = (n.new_float_n, n.new_int),
        _ = (n.new_int_n, n.assert),
        i = a(10),
        o = a(1),
        l = a(3),
        f = a(2);
      e.exports = function (e) {
        var t = e;
        (this.quantize = t),
          (this.iteration_loop = function (e, t, a, n) {
            var c,
              u = e.internal_flags,
              h = s(l.SFBMAX),
              b = s(576),
              m = r(2),
              p = 0,
              d = u.l3_side,
              v = new i(p);
            this.quantize.rv.ResvFrameBegin(e, v), (p = v.bits);
            for (var g = 0; g < u.mode_gr; g++) {
              (c = this.quantize.qupvt.on_pe(e, t, m, p, g, g)),
                u.mode_ext == o.MPG_MD_MS_LR &&
                  (this.quantize.ms_convert(u.l3_side, g),
                  this.quantize.qupvt.reduce_side(m, a[g], p, c));
              for (var S = 0; S < u.channels_out; S++) {
                var M,
                  w,
                  A = d.tt[g][S];
                A.block_type != o.SHORT_TYPE
                  ? ((M = 0), (w = u.PSY.mask_adjust - M))
                  : ((M = 0), (w = u.PSY.mask_adjust_short - M)),
                  (u.masking_lower = Math.pow(10, 0.1 * w)),
                  this.quantize.init_outer_loop(u, A),
                  this.quantize.init_xrpow(u, A, b) &&
                    (this.quantize.qupvt.calc_xmin(e, n[g][S], A, h),
                    this.quantize.outer_loop(e, A, h, b, S, m[S])),
                  this.quantize.iteration_finish_one(u, g, S),
                  _(A.part2_3_length <= f.MAX_BITS_PER_CHANNEL),
                  _(A.part2_3_length <= m[S]);
              }
            }
            this.quantize.rv.ResvFrameEnd(u, p);
          });
      };
    },
    function (e, t, a) {
      var n = a(0),
        s = (n.System, n.VbrMode);
      n.Float,
        n.ShortBlock,
        n.Util,
        n.Arrays,
        n.new_array_n,
        n.new_byte,
        n.new_double,
        n.new_float,
        n.new_float_n,
        n.new_int,
        n.new_int_n,
        n.assert;
      e.exports = function () {
        function e(e, t, a, n, s, r, _, i, o, l, f, c, u, h, b) {
          (this.vbr_q = e),
            (this.quant_comp = t),
            (this.quant_comp_s = a),
            (this.expY = n),
            (this.st_lrm = s),
            (this.st_s = r),
            (this.masking_adj = _),
            (this.masking_adj_short = i),
            (this.ath_lower = o),
            (this.ath_curve = l),
            (this.ath_sensitivity = f),
            (this.interch = c),
            (this.safejoint = u),
            (this.sfb21mod = h),
            (this.msfix = b);
        }
        function t(e, t, a, n, s, r, _, i, o, l, f, c, u, h) {
          (this.quant_comp = t),
            (this.quant_comp_s = a),
            (this.safejoint = n),
            (this.nsmsfix = s),
            (this.st_lrm = r),
            (this.st_s = _),
            (this.nsbass = i),
            (this.scale = o),
            (this.masking_adj = l),
            (this.ath_lower = f),
            (this.ath_curve = c),
            (this.interch = u),
            (this.sfscale = h);
        }
        var a;
        this.setModules = function (e) {
          a = e;
        };
        var n = [
            new e(0, 9, 9, 0, 5.2, 125, -4.2, -6.3, 4.8, 1, 0, 0, 2, 21, 0.97),
            new e(
              1,
              9,
              9,
              0,
              5.3,
              125,
              -3.6,
              -5.6,
              4.5,
              1.5,
              0,
              0,
              2,
              21,
              1.35
            ),
            new e(2, 9, 9, 0, 5.6, 125, -2.2, -3.5, 2.8, 2, 0, 0, 2, 21, 1.49),
            new e(3, 9, 9, 1, 5.8, 130, -1.8, -2.8, 2.6, 3, -4, 0, 2, 20, 1.64),
            new e(4, 9, 9, 1, 6, 135, -0.7, -1.1, 1.1, 3.5, -8, 0, 2, 0, 1.79),
            new e(
              5,
              9,
              9,
              1,
              6.4,
              140,
              0.5,
              0.4,
              -7.5,
              4,
              -12,
              2e-4,
              0,
              0,
              1.95
            ),
            new e(
              6,
              9,
              9,
              1,
              6.6,
              145,
              0.67,
              0.65,
              -14.7,
              6.5,
              -19,
              4e-4,
              0,
              0,
              2.3
            ),
            new e(
              7,
              9,
              9,
              1,
              6.6,
              145,
              0.8,
              0.75,
              -19.7,
              8,
              -22,
              6e-4,
              0,
              0,
              2.7
            ),
            new e(
              8,
              9,
              9,
              1,
              6.6,
              145,
              1.2,
              1.15,
              -27.5,
              10,
              -23,
              7e-4,
              0,
              0,
              0
            ),
            new e(9, 9, 9, 1, 6.6, 145, 1.6, 1.6, -36, 11, -25, 8e-4, 0, 0, 0),
            new e(10, 9, 9, 1, 6.6, 145, 2, 2, -36, 12, -25, 8e-4, 0, 0, 0),
          ],
          r = [
            new e(0, 9, 9, 0, 4.2, 25, -7, -4, 7.5, 1, 0, 0, 2, 26, 0.97),
            new e(1, 9, 9, 0, 4.2, 25, -5.6, -3.6, 4.5, 1.5, 0, 0, 2, 21, 1.35),
            new e(2, 9, 9, 0, 4.2, 25, -4.4, -1.8, 2, 2, 0, 0, 2, 18, 1.49),
            new e(3, 9, 9, 1, 4.2, 25, -3.4, -1.25, 1.1, 3, -4, 0, 2, 15, 1.64),
            new e(4, 9, 9, 1, 4.2, 25, -2.2, 0.1, 0, 3.5, -8, 0, 2, 0, 1.79),
            new e(
              5,
              9,
              9,
              1,
              4.2,
              25,
              -1,
              1.65,
              -7.7,
              4,
              -12,
              2e-4,
              0,
              0,
              1.95
            ),
            new e(6, 9, 9, 1, 4.2, 25, -0, 2.47, -7.7, 6.5, -19, 4e-4, 0, 0, 2),
            new e(7, 9, 9, 1, 4.2, 25, 0.5, 2, -14.5, 8, -22, 6e-4, 0, 0, 2),
            new e(8, 9, 9, 1, 4.2, 25, 1, 2.4, -22, 10, -23, 7e-4, 0, 0, 2),
            new e(9, 9, 9, 1, 4.2, 25, 1.5, 2.95, -30, 11, -25, 8e-4, 0, 0, 2),
            new e(10, 9, 9, 1, 4.2, 25, 2, 2.95, -36, 12, -30, 8e-4, 0, 0, 2),
          ];
        function _(e, t, a) {
          var _ = e.VBR == s.vbr_rh ? n : r,
            i = e.VBR_q_frac,
            o = _[t],
            l = _[t + 1],
            f = o;
          (o.st_lrm = o.st_lrm + i * (l.st_lrm - o.st_lrm)),
            (o.st_s = o.st_s + i * (l.st_s - o.st_s)),
            (o.masking_adj =
              o.masking_adj + i * (l.masking_adj - o.masking_adj)),
            (o.masking_adj_short =
              o.masking_adj_short +
              i * (l.masking_adj_short - o.masking_adj_short)),
            (o.ath_lower = o.ath_lower + i * (l.ath_lower - o.ath_lower)),
            (o.ath_curve = o.ath_curve + i * (l.ath_curve - o.ath_curve)),
            (o.ath_sensitivity =
              o.ath_sensitivity + i * (l.ath_sensitivity - o.ath_sensitivity)),
            (o.interch = o.interch + i * (l.interch - o.interch)),
            (o.msfix = o.msfix + i * (l.msfix - o.msfix)),
            (function (e, t) {
              var a = 0;
              0 > t && ((a = -1), (t = 0));
              9 < t && ((a = -1), (t = 9));
              (e.VBR_q = t), (e.VBR_q_frac = 0);
            })(e, f.vbr_q),
            0 != a
              ? (e.quant_comp = f.quant_comp)
              : Math.abs(e.quant_comp - -1) > 0 ||
                (e.quant_comp = f.quant_comp),
            0 != a
              ? (e.quant_comp_short = f.quant_comp_s)
              : Math.abs(e.quant_comp_short - -1) > 0 ||
                (e.quant_comp_short = f.quant_comp_s),
            0 != f.expY && (e.experimentalY = 0 != f.expY),
            0 != a
              ? (e.internal_flags.nsPsy.attackthre = f.st_lrm)
              : Math.abs(e.internal_flags.nsPsy.attackthre - -1) > 0 ||
                (e.internal_flags.nsPsy.attackthre = f.st_lrm),
            0 != a
              ? (e.internal_flags.nsPsy.attackthre_s = f.st_s)
              : Math.abs(e.internal_flags.nsPsy.attackthre_s - -1) > 0 ||
                (e.internal_flags.nsPsy.attackthre_s = f.st_s),
            0 != a
              ? (e.maskingadjust = f.masking_adj)
              : Math.abs(e.maskingadjust - 0) > 0 ||
                (e.maskingadjust = f.masking_adj),
            0 != a
              ? (e.maskingadjust_short = f.masking_adj_short)
              : Math.abs(e.maskingadjust_short - 0) > 0 ||
                (e.maskingadjust_short = f.masking_adj_short),
            0 != a
              ? (e.ATHlower = -f.ath_lower / 10)
              : Math.abs(10 * -e.ATHlower - 0) > 0 ||
                (e.ATHlower = -f.ath_lower / 10),
            0 != a
              ? (e.ATHcurve = f.ath_curve)
              : Math.abs(e.ATHcurve - -1) > 0 || (e.ATHcurve = f.ath_curve),
            0 != a
              ? (e.athaa_sensitivity = f.ath_sensitivity)
              : Math.abs(e.athaa_sensitivity - -1) > 0 ||
                (e.athaa_sensitivity = f.ath_sensitivity),
            f.interch > 0 &&
              (0 != a
                ? (e.interChRatio = f.interch)
                : Math.abs(e.interChRatio - -1) > 0 ||
                  (e.interChRatio = f.interch)),
            f.safejoint > 0 &&
              (e.exp_nspsytune = e.exp_nspsytune | f.safejoint),
            f.sfb21mod > 0 &&
              (e.exp_nspsytune = e.exp_nspsytune | (f.sfb21mod << 20)),
            0 != a
              ? (e.msfix = f.msfix)
              : Math.abs(e.msfix - -1) > 0 || (e.msfix = f.msfix),
            0 == a && ((e.VBR_q = t), (e.VBR_q_frac = i));
        }
        var i = [
          new t(8, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -30, 11, 0.0012, 1),
          new t(16, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -25, 11, 0.001, 1),
          new t(24, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -20, 11, 0.001, 1),
          new t(32, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -15, 11, 0.001, 1),
          new t(40, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -10, 11, 9e-4, 1),
          new t(48, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -10, 11, 9e-4, 1),
          new t(56, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -6, 11, 8e-4, 1),
          new t(64, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, -2, 11, 8e-4, 1),
          new t(80, 9, 9, 0, 0, 6.6, 145, 0, 0.95, 0, 0, 8, 7e-4, 1),
          new t(96, 9, 9, 0, 2.5, 6.6, 145, 0, 0.95, 0, 1, 5.5, 6e-4, 1),
          new t(112, 9, 9, 0, 2.25, 6.6, 145, 0, 0.95, 0, 2, 4.5, 5e-4, 1),
          new t(128, 9, 9, 0, 1.95, 6.4, 140, 0, 0.95, 0, 3, 4, 2e-4, 1),
          new t(160, 9, 9, 1, 1.79, 6, 135, 0, 0.95, -2, 5, 3.5, 0, 1),
          new t(192, 9, 9, 1, 1.49, 5.6, 125, 0, 0.97, -4, 7, 3, 0, 0),
          new t(224, 9, 9, 1, 1.25, 5.2, 125, 0, 0.98, -6, 9, 2, 0, 0),
          new t(256, 9, 9, 1, 0.97, 5.2, 125, 0, 1, -8, 10, 1, 0, 0),
          new t(320, 9, 9, 1, 0.9, 5.2, 125, 0, 1, -10, 12, 0, 0, 0),
        ];
        function o(e, t, n) {
          var r = t,
            _ = a.nearestBitrateFullIndex(t);
          if (
            ((e.VBR = s.vbr_abr),
            (e.VBR_mean_bitrate_kbps = r),
            (e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 320)),
            (e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 8)),
            (e.brate = e.VBR_mean_bitrate_kbps),
            e.VBR_mean_bitrate_kbps > 320 && (e.disable_reservoir = !0),
            i[_].safejoint > 0 && (e.exp_nspsytune = 2 | e.exp_nspsytune),
            i[_].sfscale > 0 && (e.internal_flags.noise_shaping = 2),
            Math.abs(i[_].nsbass) > 0)
          ) {
            var o = int(4 * i[_].nsbass);
            o < 0 && (o += 64), (e.exp_nspsytune = e.exp_nspsytune | (o << 2));
          }
          return (
            0 != n
              ? (e.quant_comp = i[_].quant_comp)
              : Math.abs(e.quant_comp - -1) > 0 ||
                (e.quant_comp = i[_].quant_comp),
            0 != n
              ? (e.quant_comp_short = i[_].quant_comp_s)
              : Math.abs(e.quant_comp_short - -1) > 0 ||
                (e.quant_comp_short = i[_].quant_comp_s),
            0 != n
              ? (e.msfix = i[_].nsmsfix)
              : Math.abs(e.msfix - -1) > 0 || (e.msfix = i[_].nsmsfix),
            0 != n
              ? (e.internal_flags.nsPsy.attackthre = i[_].st_lrm)
              : Math.abs(e.internal_flags.nsPsy.attackthre - -1) > 0 ||
                (e.internal_flags.nsPsy.attackthre = i[_].st_lrm),
            0 != n
              ? (e.internal_flags.nsPsy.attackthre_s = i[_].st_s)
              : Math.abs(e.internal_flags.nsPsy.attackthre_s - -1) > 0 ||
                (e.internal_flags.nsPsy.attackthre_s = i[_].st_s),
            0 != n
              ? (e.scale = i[_].scale)
              : Math.abs(e.scale - -1) > 0 || (e.scale = i[_].scale),
            0 != n
              ? (e.maskingadjust = i[_].masking_adj)
              : Math.abs(e.maskingadjust - 0) > 0 ||
                (e.maskingadjust = i[_].masking_adj),
            i[_].masking_adj > 0
              ? 0 != n
                ? (e.maskingadjust_short = 0.9 * i[_].masking_adj)
                : Math.abs(e.maskingadjust_short - 0) > 0 ||
                  (e.maskingadjust_short = 0.9 * i[_].masking_adj)
              : 0 != n
              ? (e.maskingadjust_short = 1.1 * i[_].masking_adj)
              : Math.abs(e.maskingadjust_short - 0) > 0 ||
                (e.maskingadjust_short = 1.1 * i[_].masking_adj),
            0 != n
              ? (e.ATHlower = -i[_].ath_lower / 10)
              : Math.abs(10 * -e.ATHlower - 0) > 0 ||
                (e.ATHlower = -i[_].ath_lower / 10),
            0 != n
              ? (e.ATHcurve = i[_].ath_curve)
              : Math.abs(e.ATHcurve - -1) > 0 || (e.ATHcurve = i[_].ath_curve),
            0 != n
              ? (e.interChRatio = i[_].interch)
              : Math.abs(e.interChRatio - -1) > 0 ||
                (e.interChRatio = i[_].interch),
            t
          );
        }
        this.apply_preset = function (e, t, a) {
          switch (t) {
            case Lame.R3MIX:
              (t = Lame.V3), (e.VBR = s.vbr_mtrh);
              break;
            case Lame.MEDIUM:
              (t = Lame.V4), (e.VBR = s.vbr_rh);
              break;
            case Lame.MEDIUM_FAST:
              (t = Lame.V4), (e.VBR = s.vbr_mtrh);
              break;
            case Lame.STANDARD:
              (t = Lame.V2), (e.VBR = s.vbr_rh);
              break;
            case Lame.STANDARD_FAST:
              (t = Lame.V2), (e.VBR = s.vbr_mtrh);
              break;
            case Lame.EXTREME:
              (t = Lame.V0), (e.VBR = s.vbr_rh);
              break;
            case Lame.EXTREME_FAST:
              (t = Lame.V0), (e.VBR = s.vbr_mtrh);
              break;
            case Lame.INSANE:
              return (
                (t = 320), (e.preset = t), o(e, t, a), (e.VBR = s.vbr_off), t
              );
          }
          switch (((e.preset = t), t)) {
            case Lame.V9:
              return _(e, 9, a), t;
            case Lame.V8:
              return _(e, 8, a), t;
            case Lame.V7:
              return _(e, 7, a), t;
            case Lame.V6:
              return _(e, 6, a), t;
            case Lame.V5:
              return _(e, 5, a), t;
            case Lame.V4:
              return _(e, 4, a), t;
            case Lame.V3:
              return _(e, 3, a), t;
            case Lame.V2:
              return _(e, 2, a), t;
            case Lame.V1:
              return _(e, 1, a), t;
            case Lame.V0:
              return _(e, 0, a), t;
          }
          return 8 <= t && t <= 320 ? o(e, t, a) : ((e.preset = 0), t);
        };
      };
    },
    function (e, t, a) {
      var n = a(0),
        s = n.System,
        r = n.VbrMode,
        _ = (n.Float, n.ShortBlock, n.Util),
        i = n.Arrays,
        o = (n.new_array_n, n.new_byte, n.new_double, n.new_float),
        l = (n.new_float_n, n.new_int, n.new_int_n, n.assert),
        f = a(32),
        c = a(33),
        u = a(34),
        h = a(1),
        b = a(4),
        m = a(3);
      e.exports = function () {
        var e, t, a;
        (this.rv = null), (this.qupvt = null);
        var n,
          p = new f();
        function d(e) {
          this.ordinal = e;
        }
        function v(e) {
          for (var t = 0; t < e.sfbmax; t++)
            if (e.scalefac[t] + e.subblock_gain[e.window[t]] == 0) return !1;
          return !0;
        }
        function g(e, t, a, n, s) {
          var r;
          switch (e) {
            default:
            case 9:
              t.over_count > 0
                ? ((r = a.over_SSD <= t.over_SSD),
                  a.over_SSD == t.over_SSD && (r = a.bits < t.bits))
                : (r =
                    a.max_noise < 0 &&
                    10 * a.max_noise + a.bits <= 10 * t.max_noise + t.bits);
              break;
            case 0:
              r =
                a.over_count < t.over_count ||
                (a.over_count == t.over_count && a.over_noise < t.over_noise) ||
                (a.over_count == t.over_count &&
                  BitStream.EQ(a.over_noise, t.over_noise) &&
                  a.tot_noise < t.tot_noise);
              break;
            case 8:
              a.max_noise = (function (e, t) {
                for (var a, n = 1e-37, s = 0; s < t.psymax; s++)
                  n += ((a = e[s]), _.FAST_LOG10(0.368 + 0.632 * a * a * a));
                return Math.max(1e-20, n);
              })(s, n);
            case 1:
              r = a.max_noise < t.max_noise;
              break;
            case 2:
              r = a.tot_noise < t.tot_noise;
              break;
            case 3:
              r = a.tot_noise < t.tot_noise && a.max_noise < t.max_noise;
              break;
            case 4:
              r =
                (a.max_noise <= 0 && t.max_noise > 0.2) ||
                (a.max_noise <= 0 &&
                  t.max_noise < 0 &&
                  t.max_noise > a.max_noise - 0.2 &&
                  a.tot_noise < t.tot_noise) ||
                (a.max_noise <= 0 &&
                  t.max_noise > 0 &&
                  t.max_noise > a.max_noise - 0.2 &&
                  a.tot_noise < t.tot_noise + t.over_noise) ||
                (a.max_noise > 0 &&
                  t.max_noise > -0.05 &&
                  t.max_noise > a.max_noise - 0.1 &&
                  a.tot_noise + a.over_noise < t.tot_noise + t.over_noise) ||
                (a.max_noise > 0 &&
                  t.max_noise > -0.1 &&
                  t.max_noise > a.max_noise - 0.15 &&
                  a.tot_noise + a.over_noise + a.over_noise <
                    t.tot_noise + t.over_noise + t.over_noise);
              break;
            case 5:
              r =
                a.over_noise < t.over_noise ||
                (BitStream.EQ(a.over_noise, t.over_noise) &&
                  a.tot_noise < t.tot_noise);
              break;
            case 6:
              r =
                a.over_noise < t.over_noise ||
                (BitStream.EQ(a.over_noise, t.over_noise) &&
                  (a.max_noise < t.max_noise ||
                    (BitStream.EQ(a.max_noise, t.max_noise) &&
                      a.tot_noise <= t.tot_noise)));
              break;
            case 7:
              r = a.over_count < t.over_count || a.over_noise < t.over_noise;
          }
          return 0 == t.over_count && (r = r && a.bits < t.bits), r;
        }
        function S(e, t, s, r, _) {
          var o = e.internal_flags;
          !(function (e, t, a, n, s) {
            var r,
              _ = e.internal_flags;
            r = 0 == t.scalefac_scale ? 1.2968395546510096 : 1.6817928305074292;
            for (var i = 0, o = 0; o < t.sfbmax; o++) i < a[o] && (i = a[o]);
            var l = _.noise_shaping_amp;
            switch ((3 == l && (l = s ? 2 : 1), l)) {
              case 2:
                break;
              case 1:
                i > 1 ? (i = Math.pow(i, 0.5)) : (i *= 0.95);
                break;
              case 0:
              default:
                i > 1 ? (i = 1) : (i *= 0.95);
            }
            var f = 0;
            for (o = 0; o < t.sfbmax; o++) {
              var c,
                u = t.width[o];
              if (((f += u), !(a[o] < i))) {
                if (
                  0 != (2 & _.substep_shaping) &&
                  ((_.pseudohalf[o] = 0 == _.pseudohalf[o] ? 1 : 0),
                  0 == _.pseudohalf[o] && 2 == _.noise_shaping_amp)
                )
                  return;
                for (t.scalefac[o]++, c = -u; c < 0; c++)
                  (n[f + c] *= r),
                    n[f + c] > t.xrpow_max && (t.xrpow_max = n[f + c]);
                if (2 == _.noise_shaping_amp) return;
              }
            }
          })(e, t, s, r, _);
          var f = v(t);
          return (
            !f &&
            (!(f =
              2 == o.mode_gr
                ? n.scale_bitcount(t)
                : n.scale_bitcount_lsf(o, t)) ||
              (o.noise_shaping > 1 &&
                (i.fill(o.pseudohalf, 0),
                0 == t.scalefac_scale
                  ? (!(function (e, t) {
                      for (var n = 0, s = 0; s < e.sfbmax; s++) {
                        var r = e.width[s],
                          _ = e.scalefac[s];
                        if (
                          (0 != e.preflag && (_ += a.pretab[s]),
                          (n += r),
                          0 != (1 & _))
                        ) {
                          _++;
                          for (var i = -r; i < 0; i++)
                            (t[n + i] *= 1.2968395546510096),
                              t[n + i] > e.xrpow_max &&
                                (e.xrpow_max = t[n + i]);
                        }
                        e.scalefac[s] = _ >> 1;
                      }
                      (e.preflag = 0), (e.scalefac_scale = 1);
                    })(t, r),
                    (f = !1))
                  : t.block_type == h.SHORT_TYPE &&
                    o.subblock_gain > 0 &&
                    (f =
                      (function (e, t, n) {
                        var s,
                          r = t.scalefac;
                        for (s = 0; s < t.sfb_lmax; s++)
                          if (r[s] >= 16) return !0;
                        for (var _ = 0; _ < 3; _++) {
                          var i = 0,
                            o = 0;
                          for (s = t.sfb_lmax + _; s < t.sfbdivide; s += 3)
                            i < r[s] && (i = r[s]);
                          for (; s < t.sfbmax; s += 3) o < r[s] && (o = r[s]);
                          if (!(i < 16 && o < 8)) {
                            if (t.subblock_gain[_] >= 7) return !0;
                            t.subblock_gain[_]++;
                            var f = e.scalefac_band.l[t.sfb_lmax];
                            for (s = t.sfb_lmax + _; s < t.sfbmax; s += 3) {
                              var c = t.width[s],
                                u = r[s];
                              if (
                                (l(u >= 0), (u -= 4 >> t.scalefac_scale) >= 0)
                              )
                                (r[s] = u), (f += 3 * c);
                              else {
                                r[s] = 0;
                                var h = 210 + (u << (t.scalefac_scale + 1));
                                (m = a.IPOW20(h)), (f += c * (_ + 1));
                                for (var b = -c; b < 0; b++)
                                  (n[f + b] *= m),
                                    n[f + b] > t.xrpow_max &&
                                      (t.xrpow_max = n[f + b]);
                                f += c * (3 - _ - 1);
                              }
                            }
                            var m = a.IPOW20(202);
                            f += t.width[s] * (_ + 1);
                            for (b = -t.width[s]; b < 0; b++)
                              (n[f + b] *= m),
                                n[f + b] > t.xrpow_max &&
                                  (t.xrpow_max = n[f + b]);
                          }
                        }
                        return !1;
                      })(o, t, r) || v(t))),
              f ||
                (f =
                  2 == o.mode_gr
                    ? n.scale_bitcount(t)
                    : n.scale_bitcount_lsf(o, t)),
              !f))
          );
        }
        (this.setModules = function (s, r, _, i) {
          (e = s),
            (t = r),
            (this.rv = r),
            (a = _),
            (this.qupvt = _),
            (n = i),
            p.setModules(a, n);
        }),
          (this.ms_convert = function (e, t) {
            for (var a = 0; a < 576; ++a) {
              var n = e.tt[t][0].xr[a],
                s = e.tt[t][1].xr[a];
              (e.tt[t][0].xr[a] = (n + s) * (0.5 * _.SQRT2)),
                (e.tt[t][1].xr[a] = (n - s) * (0.5 * _.SQRT2));
            }
          }),
          (this.init_xrpow = function (e, t, a) {
            var n = 0,
              s = 0 | t.max_nonzero_coeff;
            if (
              (l(null != a),
              (t.xrpow_max = 0),
              l(0 <= s && s <= 575),
              i.fill(a, s, 576, 0),
              (n = (function (e, t, a, n) {
                n = 0;
                for (var s = 0; s <= a; ++s) {
                  var r = Math.abs(e.xr[s]);
                  (n += r),
                    (t[s] = Math.sqrt(r * Math.sqrt(r))),
                    t[s] > e.xrpow_max && (e.xrpow_max = t[s]);
                }
                return n;
              })(t, a, s, n)) > 1e-20)
            ) {
              var r = 0;
              0 != (2 & e.substep_shaping) && (r = 1);
              for (var _ = 0; _ < t.psymax; _++) e.pseudohalf[_] = r;
              return !0;
            }
            return i.fill(t.l3_enc, 0, 576, 0), !1;
          }),
          (this.init_outer_loop = function (e, t) {
            (t.part2_3_length = 0),
              (t.big_values = 0),
              (t.count1 = 0),
              (t.global_gain = 210),
              (t.scalefac_compress = 0),
              (t.table_select[0] = 0),
              (t.table_select[1] = 0),
              (t.table_select[2] = 0),
              (t.subblock_gain[0] = 0),
              (t.subblock_gain[1] = 0),
              (t.subblock_gain[2] = 0),
              (t.subblock_gain[3] = 0),
              (t.region0_count = 0),
              (t.region1_count = 0),
              (t.preflag = 0),
              (t.scalefac_scale = 0),
              (t.count1table_select = 0),
              (t.part2_length = 0),
              (t.sfb_lmax = h.SBPSY_l),
              (t.sfb_smin = h.SBPSY_s),
              (t.psy_lmax = e.sfb21_extra ? h.SBMAX_l : h.SBPSY_l),
              (t.psymax = t.psy_lmax),
              (t.sfbmax = t.sfb_lmax),
              (t.sfbdivide = 11);
            for (var n = 0; n < h.SBMAX_l; n++)
              (t.width[n] = e.scalefac_band.l[n + 1] - e.scalefac_band.l[n]),
                (t.window[n] = 3);
            if (t.block_type == h.SHORT_TYPE) {
              var r = o(576);
              (t.sfb_smin = 0),
                (t.sfb_lmax = 0),
                0 != t.mixed_block_flag &&
                  ((t.sfb_smin = 3), (t.sfb_lmax = 2 * e.mode_gr + 4)),
                (t.psymax =
                  t.sfb_lmax +
                  3 * ((e.sfb21_extra ? h.SBMAX_s : h.SBPSY_s) - t.sfb_smin)),
                (t.sfbmax = t.sfb_lmax + 3 * (h.SBPSY_s - t.sfb_smin)),
                (t.sfbdivide = t.sfbmax - 18),
                (t.psy_lmax = t.sfb_lmax);
              var _ = e.scalefac_band.l[t.sfb_lmax];
              s.arraycopy(t.xr, 0, r, 0, 576);
              for (n = t.sfb_smin; n < h.SBMAX_s; n++)
                for (
                  var l = e.scalefac_band.s[n],
                    f = e.scalefac_band.s[n + 1],
                    c = 0;
                  c < 3;
                  c++
                )
                  for (var u = l; u < f; u++) t.xr[_++] = r[3 * u + c];
              var b = t.sfb_lmax;
              for (n = t.sfb_smin; n < h.SBMAX_s; n++)
                (t.width[b] = t.width[b + 1] = t.width[b + 2] =
                  e.scalefac_band.s[n + 1] - e.scalefac_band.s[n]),
                  (t.window[b] = 0),
                  (t.window[b + 1] = 1),
                  (t.window[b + 2] = 2),
                  (b += 3);
            }
            (t.count1bits = 0),
              (t.sfb_partition_table = a.nr_of_sfb_block[0][0]),
              (t.slen[0] = 0),
              (t.slen[1] = 0),
              (t.slen[2] = 0),
              (t.slen[3] = 0),
              (t.max_nonzero_coeff = 575),
              i.fill(t.scalefac, 0),
              (function (e, t) {
                var n = e.ATH,
                  s = t.xr;
                if (t.block_type != h.SHORT_TYPE)
                  for (var r = !1, _ = h.PSFB21 - 1; _ >= 0 && !r; _--) {
                    var i = e.scalefac_band.psfb21[_],
                      o = e.scalefac_band.psfb21[_ + 1],
                      l = a.athAdjust(n.adjust, n.psfb21[_], n.floor);
                    e.nsPsy.longfact[21] > 1e-12 && (l *= e.nsPsy.longfact[21]);
                    for (var f = o - 1; f >= i; f--) {
                      if (!(Math.abs(s[f]) < l)) {
                        r = !0;
                        break;
                      }
                      s[f] = 0;
                    }
                  }
                else
                  for (var c = 0; c < 3; c++)
                    for (r = !1, _ = h.PSFB12 - 1; _ >= 0 && !r; _--) {
                      o =
                        (i =
                          3 * e.scalefac_band.s[12] +
                          (e.scalefac_band.s[13] - e.scalefac_band.s[12]) * c +
                          (e.scalefac_band.psfb12[_] -
                            e.scalefac_band.psfb12[0])) +
                        (e.scalefac_band.psfb12[_ + 1] -
                          e.scalefac_band.psfb12[_]);
                      var u = a.athAdjust(n.adjust, n.psfb12[_], n.floor);
                      e.nsPsy.shortfact[12] > 1e-12 &&
                        (u *= e.nsPsy.shortfact[12]);
                      for (f = o - 1; f >= i; f--) {
                        if (!(Math.abs(s[f]) < u)) {
                          r = !0;
                          break;
                        }
                        s[f] = 0;
                      }
                    }
              })(e, t);
          }),
          (d.BINSEARCH_NONE = new d(0)),
          (d.BINSEARCH_UP = new d(1)),
          (d.BINSEARCH_DOWN = new d(2)),
          (this.trancate_smallspectrums = function (e, t, s, r) {
            var _ = o(m.SFBMAX);
            if (
              (0 != (4 & e.substep_shaping) || t.block_type != h.SHORT_TYPE) &&
              0 == (128 & e.substep_shaping)
            ) {
              a.calc_noise(t, s, _, new c(), null);
              for (var l = 0; l < 576; l++) {
                var f = 0;
                0 != t.l3_enc[l] && (f = Math.abs(t.xr[l])), (r[l] = f);
              }
              l = 0;
              var u = 8;
              t.block_type == h.SHORT_TYPE && (u = 6);
              do {
                var b,
                  p,
                  d,
                  v,
                  g = t.width[u];
                if (
                  ((l += g),
                  !(
                    _[u] >= 1 ||
                    (i.sort(r, l - g, g), BitStream.EQ(r[l - 1], 0))
                  ))
                ) {
                  (b = (1 - _[u]) * s[u]), (p = 0), (v = 0);
                  do {
                    var S;
                    for (
                      d = 1;
                      v + d < g &&
                      !BitStream.NEQ(r[v + l - g], r[v + l + d - g]);
                      d++
                    );
                    if (b < (S = r[v + l - g] * r[v + l - g] * d)) {
                      0 != v && (p = r[v + l - g - 1]);
                      break;
                    }
                    (b -= S), (v += d);
                  } while (v < g);
                  if (!BitStream.EQ(p, 0))
                    do {
                      Math.abs(t.xr[l - g]) <= p && (t.l3_enc[l - g] = 0);
                    } while (--g > 0);
                }
              } while (++u < t.psymax);
              t.part2_3_length = n.noquant_count_bits(e, t, null);
            }
          }),
          (this.outer_loop = function (e, t, _, i, f, p) {
            var v = e.internal_flags,
              M = new b(),
              w = o(576),
              A = o(m.SFBMAX),
              R = new c(),
              B = new u(),
              y = 9999999,
              E = !1,
              T = !1,
              x = 0;
            if (
              ((function (e, t, a, s, r) {
                var _,
                  i = e.CurrentStep[s],
                  o = !1,
                  f = e.OldValue[s],
                  c = d.BINSEARCH_NONE;
                for (t.global_gain = f, a -= t.part2_length, l(0 != i); ; ) {
                  var u;
                  if (((_ = n.count_bits(e, r, t, null)), 1 == i || _ == a))
                    break;
                  _ > a
                    ? (c == d.BINSEARCH_DOWN && (o = !0),
                      o && (i /= 2),
                      (c = d.BINSEARCH_UP),
                      (u = i))
                    : (c == d.BINSEARCH_UP && (o = !0),
                      o && (i /= 2),
                      (c = d.BINSEARCH_DOWN),
                      (u = -i)),
                    (t.global_gain += u),
                    t.global_gain < 0 && ((t.global_gain = 0), (o = !0)),
                    t.global_gain > 255 && ((t.global_gain = 255), (o = !0));
                }
                for (
                  l(t.global_gain >= 0), l(t.global_gain < 256);
                  _ > a && t.global_gain < 255;

                )
                  t.global_gain++, (_ = n.count_bits(e, r, t, null));
                (e.CurrentStep[s] = f - t.global_gain >= 4 ? 4 : 2),
                  (e.OldValue[s] = t.global_gain),
                  (t.part2_3_length = _);
              })(v, t, p, f, i),
              0 == v.noise_shaping)
            )
              return 100;
            a.calc_noise(t, _, A, R, B),
              (R.bits = t.part2_3_length),
              M.assign(t);
            var k = 0;
            for (s.arraycopy(i, 0, w, 0, 576); !E; ) {
              do {
                var P,
                  I = new c(),
                  L = 255;
                if (
                  ((P = 0 != (2 & v.substep_shaping) ? 20 : 3), v.sfb21_extra)
                ) {
                  if (A[M.sfbmax] > 1) break;
                  if (
                    M.block_type == h.SHORT_TYPE &&
                    (A[M.sfbmax + 1] > 1 || A[M.sfbmax + 2] > 1)
                  )
                    break;
                }
                if (!S(e, M, A, i, T)) break;
                0 != M.scalefac_scale && (L = 254);
                var V = p - M.part2_length;
                if (V <= 0) break;
                for (
                  ;
                  (M.part2_3_length = n.count_bits(v, i, M, B)) > V &&
                  M.global_gain <= L;

                )
                  M.global_gain++;
                if (M.global_gain > L) break;
                if (0 == R.over_count) {
                  for (
                    ;
                    (M.part2_3_length = n.count_bits(v, i, M, B)) > y &&
                    M.global_gain <= L;

                  )
                    M.global_gain++;
                  if (M.global_gain > L) break;
                }
                if (
                  (a.calc_noise(M, _, A, I, B),
                  (I.bits = M.part2_3_length),
                  0 !=
                    (g(
                      t.block_type != h.SHORT_TYPE
                        ? e.quant_comp
                        : e.quant_comp_short,
                      R,
                      I,
                      M,
                      A
                    )
                      ? 1
                      : 0))
                )
                  (y = t.part2_3_length),
                    (R = I),
                    t.assign(M),
                    (k = 0),
                    s.arraycopy(i, 0, w, 0, 576);
                else if (0 == v.full_outer_loop) {
                  if (++k > P && 0 == R.over_count) break;
                  if (3 == v.noise_shaping_amp && T && k > 30) break;
                  if (3 == v.noise_shaping_amp && T && M.global_gain - x > 15)
                    break;
                }
              } while (M.global_gain + M.scalefac_scale < 255);
              3 == v.noise_shaping_amp
                ? T
                  ? (E = !0)
                  : (M.assign(t),
                    s.arraycopy(w, 0, i, 0, 576),
                    (k = 0),
                    (x = M.global_gain),
                    (T = !0))
                : (E = !0);
            }
            return (
              l(t.global_gain + t.scalefac_scale <= 255),
              e.VBR == r.vbr_rh || e.VBR == r.vbr_mtrh
                ? s.arraycopy(w, 0, i, 0, 576)
                : 0 != (1 & v.substep_shaping) &&
                  trancate_smallspectrums(v, t, _, i),
              R.over_count
            );
          }),
          (this.iteration_finish_one = function (e, a, s) {
            var r = e.l3_side,
              _ = r.tt[a][s];
            n.best_scalefac_store(e, a, s, r),
              1 == e.use_best_huffman && n.best_huffman_divide(e, _),
              t.ResvAdjust(e, _);
          }),
          (this.VBR_encode_granule = function (e, t, a, n, r, _, f) {
            var c,
              u = e.internal_flags,
              h = new b(),
              m = o(576),
              p = f,
              d = f + 1,
              v = (f + _) / 2,
              g = 0,
              S = u.sfb21_extra;
            l(p <= LameInternalFlags.MAX_BITS_PER_CHANNEL), i.fill(h.l3_enc, 0);
            do {
              l(v >= _),
                l(v <= f),
                l(_ <= f),
                (u.sfb21_extra = !(v > p - 42) && S),
                outer_loop(e, t, a, n, r, v) <= 0
                  ? ((g = 1),
                    (d = t.part2_3_length),
                    h.assign(t),
                    s.arraycopy(n, 0, m, 0, 576),
                    (c = (f = d - 32) - _),
                    (v = (f + _) / 2))
                  : ((c = f - (_ = v + 32)),
                    (v = (f + _) / 2),
                    0 != g &&
                      ((g = 2), t.assign(h), s.arraycopy(m, 0, n, 0, 576)));
            } while (c > 12);
            (u.sfb21_extra = S),
              2 == g && s.arraycopy(h.l3_enc, 0, t.l3_enc, 0, 576),
              l(t.part2_3_length <= p);
          }),
          (this.get_framebits = function (a, n) {
            var s = a.internal_flags;
            s.bitrate_index = s.VBR_min_bitrate;
            var r = e.getframebits(a);
            (s.bitrate_index = 1), (r = e.getframebits(a));
            for (var _ = 1; _ <= s.VBR_max_bitrate; _++) {
              s.bitrate_index = _;
              var i = new MeanBits(r);
              (n[_] = t.ResvFrameBegin(a, i)), (r = i.bits);
            }
          }),
          (this.VBR_old_prepare = function (e, n, s, r, _, i, o, l, f) {
            var c,
              u = e.internal_flags,
              b = 0,
              m = 1,
              p = 0;
            u.bitrate_index = u.VBR_max_bitrate;
            var d = t.ResvFrameBegin(e, new MeanBits(0)) / u.mode_gr;
            get_framebits(e, i);
            for (var v = 0; v < u.mode_gr; v++) {
              var g = a.on_pe(e, n, l[v], d, v, 0);
              u.mode_ext == h.MPG_MD_MS_LR &&
                (ms_convert(u.l3_side, v), a.reduce_side(l[v], s[v], d, g));
              for (var S = 0; S < u.channels_out; ++S) {
                var M = u.l3_side.tt[v][S];
                M.block_type != h.SHORT_TYPE
                  ? ((b = 1.28 / (1 + Math.exp(3.5 - n[v][S] / 300)) - 0.05),
                    (c = u.PSY.mask_adjust - b))
                  : ((b = 2.56 / (1 + Math.exp(3.5 - n[v][S] / 300)) - 0.14),
                    (c = u.PSY.mask_adjust_short - b)),
                  (u.masking_lower = Math.pow(10, 0.1 * c)),
                  init_outer_loop(u, M),
                  (f[v][S] = a.calc_xmin(e, r[v][S], M, _[v][S])),
                  0 != f[v][S] && (m = 0),
                  (o[v][S] = 126),
                  (p += l[v][S]);
              }
            }
            for (v = 0; v < u.mode_gr; v++)
              for (S = 0; S < u.channels_out; S++)
                p > i[u.VBR_max_bitrate] &&
                  ((l[v][S] *= i[u.VBR_max_bitrate]), (l[v][S] /= p)),
                  o[v][S] > l[v][S] && (o[v][S] = l[v][S]);
            return m;
          }),
          (this.bitpressure_strategy = function (e, t, a, n) {
            for (var s = 0; s < e.mode_gr; s++)
              for (var r = 0; r < e.channels_out; r++) {
                for (
                  var _ = e.l3_side.tt[s][r], i = t[s][r], o = 0, l = 0;
                  l < _.psy_lmax;
                  l++
                )
                  i[o++] *= 1 + (0.029 * l * l) / h.SBMAX_l / h.SBMAX_l;
                if (_.block_type == h.SHORT_TYPE)
                  for (l = _.sfb_smin; l < h.SBMAX_s; l++)
                    (i[o++] *= 1 + (0.029 * l * l) / h.SBMAX_s / h.SBMAX_s),
                      (i[o++] *= 1 + (0.029 * l * l) / h.SBMAX_s / h.SBMAX_s),
                      (i[o++] *= 1 + (0.029 * l * l) / h.SBMAX_s / h.SBMAX_s);
                n[s][r] = 0 | Math.max(a[s][r], 0.9 * n[s][r]);
              }
          }),
          (this.VBR_new_prepare = function (e, n, s, r, _, i) {
            var o,
              l = e.internal_flags,
              f = 1,
              c = 0,
              u = 0;
            if (e.free_format) {
              l.bitrate_index = 0;
              b = new MeanBits(c);
              (o = t.ResvFrameBegin(e, b)), (c = b.bits), (_[0] = o);
            } else {
              l.bitrate_index = l.VBR_max_bitrate;
              var b = new MeanBits(c);
              t.ResvFrameBegin(e, b),
                (c = b.bits),
                get_framebits(e, _),
                (o = _[l.VBR_max_bitrate]);
            }
            for (var m = 0; m < l.mode_gr; m++) {
              a.on_pe(e, n, i[m], c, m, 0),
                l.mode_ext == h.MPG_MD_MS_LR && ms_convert(l.l3_side, m);
              for (var p = 0; p < l.channels_out; ++p) {
                var d = l.l3_side.tt[m][p];
                (l.masking_lower = Math.pow(10, 0.1 * l.PSY.mask_adjust)),
                  init_outer_loop(l, d),
                  0 != a.calc_xmin(e, s[m][p], d, r[m][p]) && (f = 0),
                  (u += i[m][p]);
              }
            }
            for (m = 0; m < l.mode_gr; m++)
              for (p = 0; p < l.channels_out; p++)
                u > o && ((i[m][p] *= o), (i[m][p] /= u));
            return f;
          }),
          (this.calc_target_bits = function (n, s, r, _, i, o) {
            var l,
              f,
              c,
              u,
              b = n.internal_flags,
              m = b.l3_side,
              p = 0;
            b.bitrate_index = b.VBR_max_bitrate;
            var d = new MeanBits(p);
            for (
              o[0] = t.ResvFrameBegin(n, d),
                p = d.bits,
                b.bitrate_index = 1,
                p = e.getframebits(n) - 8 * b.sideinfo_len,
                i[0] = p / (b.mode_gr * b.channels_out),
                p = n.VBR_mean_bitrate_kbps * n.framesize * 1e3,
                0 != (1 & b.substep_shaping) && (p *= 1.09),
                p /= n.out_samplerate,
                p -= 8 * b.sideinfo_len,
                p /= b.mode_gr * b.channels_out,
                (l = 0.93 + (0.07 * (11 - n.compression_ratio)) / 5.5) < 0.9 &&
                  (l = 0.9),
                l > 1 && (l = 1),
                f = 0;
              f < b.mode_gr;
              f++
            ) {
              var v = 0;
              for (c = 0; c < b.channels_out; c++) {
                if (((_[f][c] = int(l * p)), s[f][c] > 700)) {
                  var g = int((s[f][c] - 700) / 1.4),
                    S = m.tt[f][c];
                  (_[f][c] = int(l * p)),
                    S.block_type == h.SHORT_TYPE && g < p / 2 && (g = p / 2),
                    g > (3 * p) / 2 ? (g = (3 * p) / 2) : g < 0 && (g = 0),
                    (_[f][c] += g);
                }
                _[f][c] > LameInternalFlags.MAX_BITS_PER_CHANNEL &&
                  (_[f][c] = LameInternalFlags.MAX_BITS_PER_CHANNEL),
                  (v += _[f][c]);
              }
              if (v > LameInternalFlags.MAX_BITS_PER_GRANULE)
                for (c = 0; c < b.channels_out; ++c)
                  (_[f][c] *= LameInternalFlags.MAX_BITS_PER_GRANULE),
                    (_[f][c] /= v);
            }
            if (b.mode_ext == h.MPG_MD_MS_LR)
              for (f = 0; f < b.mode_gr; f++)
                a.reduce_side(
                  _[f],
                  r[f],
                  p * b.channels_out,
                  LameInternalFlags.MAX_BITS_PER_GRANULE
                );
            for (u = 0, f = 0; f < b.mode_gr; f++)
              for (c = 0; c < b.channels_out; c++)
                _[f][c] > LameInternalFlags.MAX_BITS_PER_CHANNEL &&
                  (_[f][c] = LameInternalFlags.MAX_BITS_PER_CHANNEL),
                  (u += _[f][c]);
            if (u > o[0])
              for (f = 0; f < b.mode_gr; f++)
                for (c = 0; c < b.channels_out; c++)
                  (_[f][c] *= o[0]), (_[f][c] /= u);
          });
      };
    },
    function (e, t) {
      e.exports = function () {
        this.setModules = function (e, t) {
          e, t;
        };
      };
    },
    function (e, t) {
      e.exports = function () {
        (this.over_noise = 0),
          (this.tot_noise = 0),
          (this.max_noise = 0),
          (this.over_count = 0),
          (this.over_SSD = 0),
          (this.bits = 0);
      };
    },
    function (e, t, a) {
      var n = a(0),
        s = n.new_float,
        r = n.new_int;
      n.assert;
      e.exports = function () {
        (this.global_gain = 0),
          (this.sfb_count1 = 0),
          (this.step = r(39)),
          (this.noise = s(39)),
          (this.noise_log = s(39));
      };
    },
    function (e, t, a) {
      var n = a(0).assert;
      e.exports = function () {
        var e;
        (this.setModules = function (t) {
          e = t;
        }),
          (this.ResvFrameBegin = function (t, a) {
            var s,
              r = t.internal_flags,
              _ = r.l3_side,
              i = e.getframebits(t);
            a.bits = (i - 8 * r.sideinfo_len) / r.mode_gr;
            var o = 2048 * r.mode_gr - 8;
            t.brate > 320
              ? (s =
                  8 *
                  int((1e3 * t.brate) / (t.out_samplerate / 1152) / 8 + 0.5))
              : ((s = 11520),
                t.strict_ISO &&
                  (s = 8 * int(32e4 / (t.out_samplerate / 1152) / 8 + 0.5))),
              (r.ResvMax = s - i),
              r.ResvMax > o && (r.ResvMax = o),
              (r.ResvMax < 0 || t.disable_reservoir) && (r.ResvMax = 0);
            var l = a.bits * r.mode_gr + Math.min(r.ResvSize, r.ResvMax);
            return (
              l > s && (l = s),
              n(0 == r.ResvMax % 8),
              n(r.ResvMax >= 0),
              (_.resvDrain_pre = 0),
              null != r.pinfo &&
                ((r.pinfo.mean_bits = a.bits / 2),
                (r.pinfo.resvsize = r.ResvSize)),
              l
            );
          }),
          (this.ResvMaxBits = function (e, t, a, n) {
            var s,
              r = e.internal_flags,
              _ = r.ResvSize,
              i = r.ResvMax;
            0 != n && (_ += t),
              0 != (1 & r.substep_shaping) && (i *= 0.9),
              (a.bits = t),
              10 * _ > 9 * i
                ? ((s = _ - (9 * i) / 10),
                  (a.bits += s),
                  (r.substep_shaping |= 128))
                : ((s = 0),
                  (r.substep_shaping &= 127),
                  e.disable_reservoir ||
                    0 != (1 & r.substep_shaping) ||
                    (a.bits -= 0.1 * t));
            var o = _ < (6 * r.ResvMax) / 10 ? _ : (6 * r.ResvMax) / 10;
            return (o -= s) < 0 && (o = 0), o;
          }),
          (this.ResvAdjust = function (e, t) {
            e.ResvSize -= t.part2_3_length + t.part2_length;
          }),
          (this.ResvFrameEnd = function (e, t) {
            var a,
              s = e.l3_side;
            e.ResvSize += t * e.mode_gr;
            var r = 0;
            (s.resvDrain_post = 0),
              (s.resvDrain_pre = 0),
              0 != (a = e.ResvSize % 8) && (r += a),
              (a = e.ResvSize - r - e.ResvMax) > 0 &&
                (n(0 == a % 8), n(a >= 0), (r += a));
            var _ = Math.min(8 * s.main_data_begin, r) / 8;
            (s.resvDrain_pre += 8 * _),
              (r -= 8 * _),
              (e.ResvSize -= 8 * _),
              (s.main_data_begin -= _),
              (s.resvDrain_post += r),
              (e.ResvSize -= r);
          });
      };
    },
    function (e, t) {
      e.exports = function () {
        (this.getLameVersion = function () {
          return '3.98.4';
        }),
          (this.getLameShortVersion = function () {
            return '3.98.4';
          }),
          (this.getLameVeryShortVersion = function () {
            return 'LAME3.98r';
          }),
          (this.getPsyVersion = function () {
            return '0.93';
          }),
          (this.getLameUrl = function () {
            return 'http://www.mp3dev.org/';
          }),
          (this.getLameOsBitness = function () {
            return '32bits';
          });
      };
    },
    function (e, t, a) {
      var n = a(0),
        s = n.System,
        r = n.VbrMode,
        _ = (n.Float, n.ShortBlock),
        i = (n.Util, n.Arrays),
        o = (n.new_array_n, n.new_byte),
        l =
          (n.new_double,
          n.new_float,
          n.new_float_n,
          n.new_int,
          n.new_int_n,
          n.assert);
      function f() {
        var e, t, a;
        this.setModules = function (n, s, r) {
          (e = n), (t = s), (a = r);
        };
        var n = f.NUMTOCENTRIES,
          c = f.MAXFRAMESIZE,
          u =
            n +
            4 +
            4 +
            4 +
            4 +
            4 +
            9 +
            1 +
            1 +
            8 +
            1 +
            1 +
            3 +
            1 +
            1 +
            2 +
            4 +
            2 +
            2,
          h = [
            0,
            49345,
            49537,
            320,
            49921,
            960,
            640,
            49729,
            50689,
            1728,
            1920,
            51009,
            1280,
            50625,
            50305,
            1088,
            52225,
            3264,
            3456,
            52545,
            3840,
            53185,
            52865,
            3648,
            2560,
            51905,
            52097,
            2880,
            51457,
            2496,
            2176,
            51265,
            55297,
            6336,
            6528,
            55617,
            6912,
            56257,
            55937,
            6720,
            7680,
            57025,
            57217,
            8e3,
            56577,
            7616,
            7296,
            56385,
            5120,
            54465,
            54657,
            5440,
            55041,
            6080,
            5760,
            54849,
            53761,
            4800,
            4992,
            54081,
            4352,
            53697,
            53377,
            4160,
            61441,
            12480,
            12672,
            61761,
            13056,
            62401,
            62081,
            12864,
            13824,
            63169,
            63361,
            14144,
            62721,
            13760,
            13440,
            62529,
            15360,
            64705,
            64897,
            15680,
            65281,
            16320,
            16e3,
            65089,
            64001,
            15040,
            15232,
            64321,
            14592,
            63937,
            63617,
            14400,
            10240,
            59585,
            59777,
            10560,
            60161,
            11200,
            10880,
            59969,
            60929,
            11968,
            12160,
            61249,
            11520,
            60865,
            60545,
            11328,
            58369,
            9408,
            9600,
            58689,
            9984,
            59329,
            59009,
            9792,
            8704,
            58049,
            58241,
            9024,
            57601,
            8640,
            8320,
            57409,
            40961,
            24768,
            24960,
            41281,
            25344,
            41921,
            41601,
            25152,
            26112,
            42689,
            42881,
            26432,
            42241,
            26048,
            25728,
            42049,
            27648,
            44225,
            44417,
            27968,
            44801,
            28608,
            28288,
            44609,
            43521,
            27328,
            27520,
            43841,
            26880,
            43457,
            43137,
            26688,
            30720,
            47297,
            47489,
            31040,
            47873,
            31680,
            31360,
            47681,
            48641,
            32448,
            32640,
            48961,
            32e3,
            48577,
            48257,
            31808,
            46081,
            29888,
            30080,
            46401,
            30464,
            47041,
            46721,
            30272,
            29184,
            45761,
            45953,
            29504,
            45313,
            29120,
            28800,
            45121,
            20480,
            37057,
            37249,
            20800,
            37633,
            21440,
            21120,
            37441,
            38401,
            22208,
            22400,
            38721,
            21760,
            38337,
            38017,
            21568,
            39937,
            23744,
            23936,
            40257,
            24320,
            40897,
            40577,
            24128,
            23040,
            39617,
            39809,
            23360,
            39169,
            22976,
            22656,
            38977,
            34817,
            18624,
            18816,
            35137,
            19200,
            35777,
            35457,
            19008,
            19968,
            36545,
            36737,
            20288,
            36097,
            19904,
            19584,
            35905,
            17408,
            33985,
            34177,
            17728,
            34561,
            18368,
            18048,
            34369,
            33281,
            17088,
            17280,
            33601,
            16640,
            33217,
            32897,
            16448,
          ];
        function b(e, t) {
          var a = 255 & e[t + 0];
          return (
            (a <<= 8),
            (a |= 255 & e[t + 1]),
            (a <<= 8),
            (a |= 255 & e[t + 2]),
            (a <<= 8),
            (a |= 255 & e[t + 3])
          );
        }
        function m(e, t, a) {
          (e[t + 0] = 255 & (a >> 24)),
            (e[t + 1] = 255 & (a >> 16)),
            (e[t + 2] = 255 & (a >> 8)),
            (e[t + 3] = 255 & a);
        }
        function p(e, t, a) {
          (e[t + 0] = 255 & (a >> 8)), (e[t + 1] = 255 & a);
        }
        function d(e, t, a) {
          return 255 & ((e << t) | (a & ~(-1 << t)));
        }
        function v(t, a) {
          var n = t.internal_flags;
          (a[0] = d(a[0], 8, 255)),
            (a[1] = d(a[1], 3, 7)),
            (a[1] = d(a[1], 1, t.out_samplerate < 16e3 ? 0 : 1)),
            (a[1] = d(a[1], 1, t.version)),
            (a[1] = d(a[1], 2, 1)),
            (a[1] = d(a[1], 1, t.error_protection ? 0 : 1)),
            (a[2] = d(a[2], 4, n.bitrate_index)),
            (a[2] = d(a[2], 2, n.samplerate_index)),
            (a[2] = d(a[2], 1, 0)),
            (a[2] = d(a[2], 1, t.extension)),
            (a[3] = d(a[3], 2, t.mode.ordinal())),
            (a[3] = d(a[3], 2, n.mode_ext)),
            (a[3] = d(a[3], 1, t.copyright)),
            (a[3] = d(a[3], 1, t.original)),
            (a[3] = d(a[3], 2, t.emphasis)),
            (a[0] = 255);
          var s,
            _,
            i = 241 & a[1];
          (s = 1 == t.version ? 128 : t.out_samplerate < 16e3 ? 32 : 64),
            t.VBR == r.vbr_off && (s = t.brate),
            (_ = t.free_format
              ? 0
              : 255 & (16 * e.BitrateIndex(s, t.version, t.out_samplerate))),
            1 == t.version
              ? ((a[1] = 255 & (10 | i)),
                (i = 13 & a[2]),
                (a[2] = 255 & (_ | i)))
              : ((a[1] = 255 & (2 | i)),
                (i = 13 & a[2]),
                (a[2] = 255 & (_ | i)));
        }
        function g(e, t) {
          return (t = (t >> 8) ^ h[255 & (t ^ e)]);
        }
        (this.addVbrFrame = function (e) {
          var t = e.internal_flags,
            a = Tables.bitrate_table[e.version][t.bitrate_index];
          l(null != t.VBR_seek_table.bag),
            (function (e, t) {
              if (
                (e.nVbrNumFrames++,
                (e.sum += t),
                e.seen++,
                !(e.seen < e.want) &&
                  (e.pos < e.size &&
                    ((e.bag[e.pos] = e.sum), e.pos++, (e.seen = 0)),
                  e.pos == e.size))
              ) {
                for (var a = 1; a < e.size; a += 2) e.bag[a / 2] = e.bag[a];
                (e.want *= 2), (e.pos /= 2);
              }
            })(t.VBR_seek_table, a);
        }),
          (this.getVbrTag = function (e) {
            var t = new VBRTagData(),
              a = 0;
            t.flags = 0;
            var s = (e[a + 1] >> 3) & 1,
              r = (e[a + 2] >> 2) & 3,
              _ = (e[a + 3] >> 6) & 3,
              i = (e[a + 2] >> 4) & 15;
            if (
              ((i = Tables.bitrate_table[s][i]),
              e[a + 1] >> 4 == 14
                ? (t.samprate = Tables.samplerate_table[2][r])
                : (t.samprate = Tables.samplerate_table[s][r]),
              !(function (e, t) {
                return (
                  new String(e, t, 'Xing'.length(), null).equals('Xing') ||
                  new String(e, t, 'Info'.length(), null).equals('Info')
                );
              })(e, (a += 0 != s ? (3 != _ ? 36 : 21) : 3 != _ ? 21 : 13)))
            )
              return null;
            (a += 4), (t.hId = s);
            var o = (t.flags = b(e, a));
            if (
              ((a += 4),
              0 != (1 & o) && ((t.frames = b(e, a)), (a += 4)),
              0 != (2 & o) && ((t.bytes = b(e, a)), (a += 4)),
              0 != (4 & o))
            ) {
              if (null != t.toc)
                for (var l = 0; l < n; l++) t.toc[l] = e[a + l];
              a += n;
            }
            (t.vbrScale = -1),
              0 != (8 & o) && ((t.vbrScale = b(e, a)), (a += 4)),
              (t.headersize = (72e3 * (s + 1) * i) / t.samprate);
            var f = e[(a += 21) + 0] << 4;
            f += e[a + 1] >> 4;
            var c = (15 & e[a + 1]) << 8;
            return (
              (f < 0 || f > 3e3) && (f = -1),
              ((c += 255 & e[a + 2]) < 0 || c > 3e3) && (c = -1),
              (t.encDelay = f),
              (t.encPadding = c),
              t
            );
          }),
          (this.InitVbrTag = function (e) {
            var a,
              n = e.internal_flags;
            (a = 1 == e.version ? 128 : e.out_samplerate < 16e3 ? 32 : 64),
              e.VBR == r.vbr_off && (a = e.brate);
            var s = (72e3 * (e.version + 1) * a) / e.out_samplerate,
              _ = n.sideinfo_len + u;
            if (((n.VBR_seek_table.TotalFrameSize = s), s < _ || s > c))
              e.bWriteVbrTag = !1;
            else {
              (n.VBR_seek_table.nVbrNumFrames = 0),
                (n.VBR_seek_table.nBytesWritten = 0),
                (n.VBR_seek_table.sum = 0),
                (n.VBR_seek_table.seen = 0),
                (n.VBR_seek_table.want = 1),
                (n.VBR_seek_table.pos = 0),
                null == n.VBR_seek_table.bag &&
                  ((n.VBR_seek_table.bag = new int[400]()),
                  (n.VBR_seek_table.size = 400));
              var i = o(c);
              v(e, i);
              for (var l = n.VBR_seek_table.TotalFrameSize, f = 0; f < l; ++f)
                t.add_dummy_byte(e, 255 & i[f], 1);
            }
          }),
          (this.updateMusicCRC = function (e, t, a, n) {
            for (var s = 0; s < n; ++s) e[0] = g(t[a + s], e[0]);
          }),
          (this.getLameTagFrame = function (e, l) {
            var f = e.internal_flags;
            if (!e.bWriteVbrTag) return 0;
            if (f.Class_ID != Lame.LAME_ID) return 0;
            if (f.VBR_seek_table.pos <= 0) return 0;
            if (l.length < f.VBR_seek_table.TotalFrameSize)
              return f.VBR_seek_table.TotalFrameSize;
            i.fill(l, 0, f.VBR_seek_table.TotalFrameSize, 0), v(e, l);
            var c = o(n);
            if (e.free_format)
              for (var u = 1; u < n; ++u) c[u] = 255 & ((255 * u) / 100);
            else
              !(function (e, t) {
                if (!(e.pos <= 0))
                  for (var a = 1; a < n; ++a) {
                    var s = a / n,
                      r = 0 | Math.floor(s * e.pos);
                    r > e.pos - 1 && (r = e.pos - 1);
                    var _ = 0 | ((256 * e.bag[r]) / e.sum);
                    _ > 255 && (_ = 255), (t[a] = 255 & _);
                  }
              })(f.VBR_seek_table, c);
            var h = f.sideinfo_len;
            e.error_protection && (h -= 2),
              e.VBR == r.vbr_off
                ? ((l[h++] = 255 & 'Info'.charAt(0)),
                  (l[h++] = 255 & 'Info'.charAt(1)),
                  (l[h++] = 255 & 'Info'.charAt(2)),
                  (l[h++] = 255 & 'Info'.charAt(3)))
                : ((l[h++] = 255 & 'Xing'.charAt(0)),
                  (l[h++] = 255 & 'Xing'.charAt(1)),
                  (l[h++] = 255 & 'Xing'.charAt(2)),
                  (l[h++] = 255 & 'Xing'.charAt(3))),
              m(l, h, 15),
              m(l, (h += 4), f.VBR_seek_table.nVbrNumFrames),
              (h += 4);
            var b =
              f.VBR_seek_table.nBytesWritten + f.VBR_seek_table.TotalFrameSize;
            m(l, h, 0 | b),
              (h += 4),
              s.arraycopy(c, 0, l, h, c.length),
              (h += c.length),
              e.error_protection && t.CRC_writeheader(f, l);
            var d = 0;
            for (u = 0; u < h; u++) d = g(l[u], d);
            return (
              (h += (function (e, t, n, s, r) {
                var i,
                  o,
                  l,
                  f,
                  c,
                  u = e.internal_flags,
                  h = 0,
                  b = e.encoder_delay,
                  d = e.encoder_padding,
                  v = 100 - 10 * e.VBR_q - e.quality,
                  S = a.getLameVeryShortVersion(),
                  M = [1, 5, 3, 2, 4, 0, 3],
                  w =
                    0 |
                    (e.lowpassfreq / 100 + 0.5 > 255
                      ? 255
                      : e.lowpassfreq / 100 + 0.5),
                  A = 0,
                  R = 0,
                  B = e.internal_flags.noise_shaping,
                  y = 0,
                  E = 0,
                  T = 0,
                  x = 0 != (1 & e.exp_nspsytune),
                  k = 0 != (2 & e.exp_nspsytune),
                  P = !1,
                  I = !1,
                  L = e.internal_flags.nogap_total,
                  V = e.internal_flags.nogap_current,
                  H = e.ATHtype;
                switch (e.VBR) {
                  case vbr_abr:
                    c = e.VBR_mean_bitrate_kbps;
                    break;
                  case vbr_off:
                    c = e.brate;
                    break;
                  default:
                    c = e.VBR_min_bitrate_kbps;
                }
                switch (
                  ((i =
                    0 + (e.VBR.ordinal() < M.length ? M[e.VBR.ordinal()] : 0)),
                  u.findReplayGain &&
                    (u.RadioGain > 510 && (u.RadioGain = 510),
                    u.RadioGain < -510 && (u.RadioGain = -510),
                    (R = 8192),
                    (R |= 3072),
                    u.RadioGain >= 0
                      ? (R |= u.RadioGain)
                      : ((R |= 512), (R |= -u.RadioGain))),
                  u.findPeakSample &&
                    (A = Math.abs(
                      0 | ((u.PeakSample / 32767) * Math.pow(2, 23) + 0.5)
                    )),
                  -1 != L && (V > 0 && (I = !0), V < L - 1 && (P = !0)),
                  (f =
                    H +
                    ((x ? 1 : 0) << 4) +
                    ((k ? 1 : 0) << 5) +
                    ((P ? 1 : 0) << 6) +
                    ((I ? 1 : 0) << 7)),
                  v < 0 && (v = 0),
                  e.mode)
                ) {
                  case MONO:
                    y = 0;
                    break;
                  case STEREO:
                    y = 1;
                    break;
                  case DUAL_CHANNEL:
                    y = 2;
                    break;
                  case JOINT_STEREO:
                    y = e.force_ms ? 4 : 3;
                    break;
                  case NOT_SET:
                  default:
                    y = 7;
                }
                (T =
                  e.in_samplerate <= 32e3
                    ? 0
                    : 48e3 == e.in_samplerate
                    ? 2
                    : e.in_samplerate > 48e3
                    ? 3
                    : 1),
                  (e.short_blocks == _.short_block_forced ||
                    e.short_blocks == _.short_block_dispensed ||
                    (-1 == e.lowpassfreq && -1 == e.highpassfreq) ||
                    e.scale_left < e.scale_right ||
                    e.scale_left > e.scale_right ||
                    (e.disable_reservoir && e.brate < 320) ||
                    e.noATH ||
                    e.ATHonly ||
                    0 == H ||
                    e.in_samplerate <= 32e3) &&
                    (E = 1),
                  (o = B + (y << 2) + (E << 5) + (T << 6)),
                  (l = u.nMusicCRC),
                  m(n, s + h, v),
                  (h += 4);
                for (var O = 0; O < 9; O++) n[s + h + O] = 255 & S.charAt(O);
                (n[s + (h += 9)] = 255 & i),
                  (n[s + ++h] = 255 & w),
                  m(n, s + ++h, A),
                  p(n, s + (h += 4), R),
                  p(n, s + (h += 2), 0),
                  (n[s + (h += 2)] = 255 & f),
                  (n[s + ++h] = c >= 255 ? 255 : 255 & c),
                  (n[s + ++h] = 255 & (b >> 4)),
                  (n[s + h + 1] = 255 & ((b << 4) + (d >> 8))),
                  (n[s + h + 2] = 255 & d),
                  (n[s + (h += 3)] = 255 & o),
                  h++,
                  (n[s + h++] = 0),
                  p(n, s + h, e.preset),
                  m(n, s + (h += 2), t),
                  p(n, s + (h += 4), l),
                  (h += 2);
                for (var N = 0; N < h; N++) r = g(n[s + N], r);
                return p(n, s + h, r), (h += 2);
              })(e, b, l, h, d)),
              f.VBR_seek_table.TotalFrameSize
            );
          }),
          (this.putVbrTag = function (e, t) {
            if (e.internal_flags.VBR_seek_table.pos <= 0) return -1;
            if ((t.seek(t.length()), 0 == t.length())) return -1;
            var a = (function (e) {
              e.seek(0);
              var t = o(10);
              return (
                e.readFully(t),
                new String(t, 'ISO-8859-1').startsWith('ID3')
                  ? 0
                  : (((127 & t[6]) << 21) |
                      ((127 & t[7]) << 14) |
                      ((127 & t[8]) << 7) |
                      (127 & t[9])) +
                    t.length
              );
            })(t);
            t.seek(a);
            var n = o(c),
              s = getLameTagFrame(e, n);
            return s > n.length ? -1 : s < 1 ? 0 : (t.write(n, 0, s), 0);
          });
      }
      (f.NUMTOCENTRIES = 100), (f.MAXFRAMESIZE = 2880), (e.exports = f);
    },
  ]);
});

class AudioStream {
  constructor(stdin) {
    this.stopped = false;
    this.stdin = stdin;
    this.readOffset = 0;
    this.duration = 0;
    this.channels = [[], []];
    this.src =
      'chrome-extension://pbcacennomncannjbmdjogheacknncbf/transferableStream.html';
    this.ac = new AudioContext({
      sampleRate: 44100,
      latencyHint: 0,
    });
    this.ac.suspend();
    this.msd = new MediaStreamAudioDestinationNode(this.ac, {
      channelCount: 2,
    });
    this.inputController = void 0;
    this.inputStream = new ReadableStream(
      {
        start: (_) => {
          return (this.inputController = _);
        },
      },
      {
        highWaterMark: 1,
        size() {
          return 1;
        },
      }
    );
    this.inputReader = this.inputStream.getReader();
    const { stream } = this.msd;
    this.stream = stream;
    const [track] = stream.getAudioTracks();
    this.track = track;
    this.osc = new OscillatorNode(this.ac, {
      frequency: 0,
    });
    this.processor = new MediaStreamTrackProcessor({
      track,
    });
    this.generator = new MediaStreamTrackGenerator({
      kind: 'audio',
    });
    const { writable } = this.generator;
    this.writable = writable;
    const { readable: audioReadable } = this.processor;
    this.audioReadable = audioReadable;
    this.audioReadableAbortable = new AbortController();
    this.audioWriter = this.writable.getWriter();
    this.mediaStream = new MediaStream([this.generator]);
    this.resolve = void 0;
    this.promise = new Promise((_) => (this.resolve = _));
    this.osc.connect(this.msd);
    this.osc.start();
    this.track.onmute = this.track.onunmute = this.track.onended = (e) =>
      console.log(e);
  }
  async start() {
    return this.nativeMessageStream();
  }
  async stop() {
    console.log(this.inputController.desiredSize);
    this.stopped = true;
    try {
      this.source.postMessage(
        {
          type: 'stop',
          message: null,
        },
        '*'
      );
    } catch (err) {
      console.error(err.message);
    }
  }
  async nativeMessageStream() {
    return new Promise((resolve) => {
      onmessage = (e) => {
        console.log(e);
        if (!this.source) {
          this.source = e.source;
        }
        if (e.data === 1) {
          this.source.postMessage(
            {
              type: 'start',
              message: this.stdin,
            },
            '*'
          );
        }
        if (e.data === 0) {
          document.querySelectorAll(`[src="${this.src}"]`).forEach((f) => {
            document.body.removeChild(f);
          });
          onmessage = null;
        }
        if (e.data instanceof ReadableStream) {
          this.stdout = e.data;
          resolve(this.captureSystemAudio());
        }
      };
      this.transferableWindow = document.createElement('iframe');
      this.transferableWindow.style.display = 'none';
      this.transferableWindow.name = location.href;
      this.transferableWindow.src = this.src;
      document.body.appendChild(this.transferableWindow);
    }).catch((err) => {
      throw err;
    });
  }
  async captureSystemAudio() {
    // this.recorder.start(1);
    let channelData = [];
    try {
      await Promise.allSettled([
        this.stdout
          .pipeTo(
            new WritableStream({
              write: async (value, c) => {
                let i = 0;
                for (; i < value.buffer.byteLength; i++, this.readOffset++) {
                  if (channelData.length === 441 * 4) {
                    this.inputController.enqueue([...channelData]);
                    channelData.length = 0;
                  }
                  channelData.push(value[i]);
                }
              },
              abort(e) {
                console.error(e.message);
              },
              close: async () => {
                console.log('Done writing input stream.');
                if (channelData.length) {
                  this.inputController.enqueue(channelData);
                }
                console.log(this.inputController.desiredSize);
                while (this.inputController.desiredSize < 0) {
                  await scheduler.postTask(() => {
                    console.log(this.inputController.desiredSize);
                  });
                }
                this.inputController.close();
                try {
                  this.msd.disconnect();
                  this.osc.disconnect();
                  this.track.stop();
                  await this.audioWriter.close();
                  await this.audioWriter.closed;
                  this.generator.stop();
                  await this.ac.close();
                  console.log();
                } catch (err) {
                  console.error(err);
                } finally {
                  console.log(
                    `readOffset:${this.readOffset}, duration:${this.duration}, ac.currentTime:${this.ac.currentTime}`,
                    `generator.readyState:${this.generator.readyState}, audioWriter.desiredSize:${this.audioWriter.desiredSize}`,
                    `inputController.desiredSize:${this.inputController.desiredSize}, ac.state:${this.ac.state}`
                  );
                  const buffer = new AudioBuffer({
                    length: this.channels[0].length,
                    sampleRate: 44100,
                    numberOfChannels: 2,
                  });
                  for (let i = 0; i < this.channels.length; i++) {
                    buffer
                      .getChannelData(i)
                      .set(new Float32Array(this.channels[i]));
                  }
                  audioEncoder(
                    buffer,
                    128,
                    (_) => {},
                    async (blob) => {
                      this.resolve(blob);
                    }
                  );
                }
              },
            })
          )
          .catch(console.warn),
        this.audioReadable
          .pipeTo(
            new WritableStream({
              abort(e) {
                console.error(e.message);
              },
              write: async ({ timestamp }) => {
                const uint8 = new Int8Array(441 * 4);
                const { value, done } = await this.inputReader.read();
                if (!done) uint8.set(new Int8Array(value));
                const uint16 = new Uint16Array(uint8.buffer);
                // https://stackoverflow.com/a/35248852
                const channels = [new Float32Array(441), new Float32Array(441)];
                for (let i = 0, j = 0, n = 1; i < uint16.length; i++) {
                  const int = uint16[i];
                  // If the high bit is on, then it is a negative number, and actually counts backwards.
                  const float =
                    int >= 0x8000 ? -(0x10000 - int) / 0x8000 : int / 0x7fff;
                  // deinterleave
                  channels[(n = ++n % 2)][!n ? j++ : j - 1] = float;
                }
                for (const [index, channel] of channels.entries()) {
                  this.channels[index].push(...channel);
                }
                const data = new Float32Array(882);
                data.set(channels.shift(), 0);
                data.set(channels.shift(), 441);
                const frame = new AudioData({
                  timestamp,
                  data,
                  sampleRate: 44100,
                  format: 'f32-planar',
                  numberOfChannels: 2,
                  numberOfFrames: 441,
                });
                this.duration += frame.duration;
                await this.audioWriter.write(frame);
              },
              close: () => {
                console.log('Done reading input stream.');
              },
            })
          )
          .catch(console.warn),
        this.ac.resume(),
      ]);
      return this.promise;
    } catch (err) {
      console.error(err);
    }
  }
}
