# ISNet (general use), 8-bit quantized

- Source model: `isnet-general-use.onnx` from the rembg project releases
  (https://github.com/danielgatis/rembg/releases/tag/v0.0.0),
  sha256 60920e99c45464f2ba57bee2ad08c919a52bbf852739e96947fbb4358c0d964a.
- Original work: "Highly Accurate Dichotomous Image Segmentation" (DIS / IS-Net),
  Xuebin Qin et al., https://github.com/xuebinqin/DIS, licensed under the Apache License 2.0.
- Change made for toolwise: dynamic 8-bit weight quantization with
  `onnxruntime.quantization.quantize_dynamic(weight_type=QUInt8)`, then split into
  20 MiB parts (Cloudflare Pages file limit). The browser joins the parts before use.
