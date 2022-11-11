﻿using System;
using System.Collections.Generic;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using SixLabors.ImageSharp.Formats;

namespace ElectronNET.API.Entities
{
    /// <summary>
    /// Native Image handler for Electron.NET
    /// </summary>
    [JsonConverter(typeof(NativeImageJsonConverter))]
    public class NativeImage
    {
        private readonly Dictionary<float, Image> _images = new();
        private bool _isTemplateImage;

        private static readonly Dictionary<string, float> ScaleFactorPairs = new()
        {
            {"@2x",   2.0f}, {"@3x",     3.0f}, {"@1x",     1.0f}, {"@4x",   4.0f},
            {"@5x",   5.0f}, {"@1.25x", 1.25f}, {"@1.33x", 1.33f}, {"@1.4x", 1.4f},
            {"@1.5x", 1.5f}, {"@1.8x",   1.8f}, {"@2.5x",   2.5f}
        };

        private static float? ExtractDpiFromFilePath(string filePath)
        {
            var withoutExtension = Path.GetFileNameWithoutExtension(filePath);
            return ScaleFactorPairs
                .Where(p => withoutExtension.EndsWith(p.Key))
                .Select(p => p.Value)
                .FirstOrDefault();
        }
        private static Image BytesToImage(byte[] bytes)
        {
            return Image.Load(new MemoryStream(bytes));
        }

        /// <summary>
        /// Creates an empty NativeImage
        /// </summary>
        public static NativeImage CreateEmpty()
        {
            return new NativeImage();
        }

        /// <summary>
        /// 
        /// </summary>
        public static NativeImage CreateFromImage(Image image, CreateFromBitmapOptions options = null)
        {
            if (options is null)
            {
                options = new CreateFromBitmapOptions();
            }

            return new NativeImage(image, options.ScaleFactor);
        }

        /// <summary>
        /// Creates a NativeImage from a byte array.
        /// </summary>
        public static NativeImage CreateFromBuffer(byte[] buffer, CreateFromBufferOptions options = null)
        {
            if (options is null)
            {
                options = new CreateFromBufferOptions();
            }

            var image = Image.Load(new MemoryStream(buffer));

            return new NativeImage(image, options.ScaleFactor);
        }

        /// <summary>
        /// Creates a NativeImage from a base64 encoded data URL.
        /// </summary>
        /// <param name="dataUrl">A data URL with a base64 encoded image.</param>
        public static NativeImage CreateFromDataURL(string dataUrl)
        {
            var images = new Dictionary<float,Image>();
            var parsedDataUrl = Regex.Match(dataUrl, @"data:image/(?<type>.+?),(?<data>.+)");
            var actualData = parsedDataUrl.Groups["data"].Value;
            var binData = Convert.FromBase64String(actualData);

            var image = BytesToImage(binData);

            images.Add(1.0f, image);

            return new NativeImage(images);
        }

        /// <summary>
        /// Creates a NativeImage from an image on the disk.
        /// </summary>
        /// <param name="path">The path of the image</param>
        public static NativeImage CreateFromPath(string path)
        {
            var images = new Dictionary<float,Image>();
            if (Regex.IsMatch(path, "(@.+?x)"))
            {
                var dpi = ExtractDpiFromFilePath(path);
                if (dpi == null)
                {
                    throw new Exception($"Invalid scaling factor for '{path}'.");
                }

                images[dpi.Value] = Image.Load(path);
            }
            else
            {
                var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(path);
                var extension = Path.GetExtension(path);
                // Load as 1x dpi
                images[1.0f] = Image.Load(path);

                foreach (var scale in ScaleFactorPairs)
                {
                    var fileName = $"{fileNameWithoutExtension}{scale}.{extension}";
                    if (File.Exists(fileName))
                    {
                        var dpi = ExtractDpiFromFilePath(fileName);
                        if (dpi != null)
                        {
                            images[dpi.Value] = Image.Load(fileName);
                        }
                    }
                }
            }

            return new NativeImage(images);
        }

        /// <summary>
        /// Creates an empty NativeImage
        /// </summary>
        public NativeImage()
        {
        }

        /// <summary>
        /// Creates a NativeImage from a bitmap and scale factor
        /// </summary>
        public NativeImage(Image bitmap, float scaleFactor = 1.0f)
        {
            _images.Add(scaleFactor, bitmap);
        }

        /// <summary>
        /// Creates a NativeImage from a dictionary of scales and images.
        /// </summary>
        public NativeImage(Dictionary<float, Image> imageDictionary)
        {
            _images = imageDictionary;
        }

        /// <summary>
        /// Crops the image specified by the input rectangle and computes scale factor
        /// </summary>
        public NativeImage Crop(Rectangle rect)
        {
            var images = new Dictionary<float, Image>();
            foreach (var image in _images)
            {
                images.Add(image.Key, Crop(rect.X, rect.Y, rect.Width, rect.Height, image.Key));
            }

            return new NativeImage(images);
        }

        /// <summary>
        /// Resizes the image and computes scale factor
        /// </summary>
        public NativeImage Resize(ResizeOptions options)
        {
            var images = new Dictionary<float, Image>();
            foreach (var image in _images)
            {
                images.Add(image.Key, Resize(options.Width, options.Height, image.Key));
            }

            return new NativeImage(images);
        }

        /// <summary>
        /// Add an image representation for a specific scale factor.
        /// </summary>
        /// <param name="options"></param>
        public void AddRepresentation(AddRepresentationOptions options)
        {
            if (options.Buffer.Length > 0)
            {
                _images[options.ScaleFactor] =
                    CreateFromBuffer(options.Buffer, new CreateFromBufferOptions {ScaleFactor = options.ScaleFactor})
                        .GetScale(options.ScaleFactor);
            }
            else if (!string.IsNullOrEmpty(options.DataUrl))
            {
                _images[options.ScaleFactor] = CreateFromDataURL(options.DataUrl).GetScale(options.ScaleFactor);
            }
        }

        /// <summary>
        /// Gets the aspect ratio for the image based on scale factor
        /// </summary>
        /// <param name="scaleFactor">Optional</param>
        public float GetAspectRatio(float scaleFactor = 1.0f)
        {
            var image = GetScale(scaleFactor);
            if (image != null)
            {
                return (float)image.Width / image.Height;
            }

            return 0f;
        }
     
        /// <summary>
        /// Gets the size of the specified image based on scale factor
        /// </summary>
        public Size GetSize(float scaleFactor = 1.0f)
        {
            if (_images.ContainsKey(scaleFactor))
            {
                var image = _images[scaleFactor];
                return new Size
                {
                    Width = image.Width,
                    Height = image.Height
                };
            }

            return null;
        }

        /// <summary>
        /// Checks to see if the NativeImage instance is empty.
        /// </summary>
        public bool IsEmpty()
        {
            return _images.Count <= 0;
        }

        /// <summary>
        /// Deprecated. Whether the image is a template image.
        /// </summary>
        public bool IsTemplateImage => _isTemplateImage;

        /// <summary>
        /// Deprecated. Marks the image as a template image.
        /// </summary>
        public void SetTemplateImage(bool option)
        {
            _isTemplateImage = option;
        }

        /// <summary>
        /// Outputs a bitmap based on the scale factor
        /// </summary>
        public MemoryStream ToBitmap(float scaleFactor = 1.0f)
        {
            var ms = new MemoryStream();
            _images[scaleFactor].SaveAsBmp(ms);
            return ms;
        }

        /// <summary>
        /// Outputs a PNG based on the scale factor
        /// </summary>
        public MemoryStream ToPng(float scaleFactor = 1.0f)
        {
            var ms = new MemoryStream();
            _images[scaleFactor].SaveAsPng(ms);
            return ms;
        }

        /// <summary>
        /// Outputs a JPEG for the default scale factor
        /// </summary>
        public MemoryStream ToJpeg(int quality, float scaleFactor = 1.0f)
        {
            var ms = new MemoryStream();
            _images[scaleFactor].SaveAsJpeg(ms, new SixLabors.ImageSharp.Formats.Jpeg.JpegEncoder() { Quality = quality });
            return ms;
        }

        /// <summary>
        /// Outputs a data URL based on the scale factor
        /// </summary>
        public string ToDataURL(float scaleFactor = 1.0f)
        {
            if (!_images.TryGetValue(scaleFactor, out var image))
            {
                throw new KeyNotFoundException($"Missing scaleFactor = {scaleFactor}");
            }

            return image.ToBase64String(PngFormat.Instance);
        }


        private Image Resize(int? width, int? height, float scaleFactor = 1.0f)
        {
            if (!_images.TryGetValue(scaleFactor, out var image))
            {
                throw new KeyNotFoundException($"Missing scaleFactor = {scaleFactor}");
            }
            if (width is null && height is null)
            {
                throw new ArgumentNullException("Missing width or height");
            }

            var aspect = GetAspectRatio(scaleFactor);
            width  ??= Convert.ToInt32(image.Width * aspect);
            height ??= Convert.ToInt32(image.Height * aspect);
            width   =  Convert.ToInt32(width * scaleFactor);
            height  =  Convert.ToInt32(height * scaleFactor);

            return image.Clone(c => c.Resize(new SixLabors.ImageSharp.Processing.ResizeOptions
            {
                Size = new(width.Value, height.Value),
                Sampler = KnownResamplers.Triangle,
            }));
        }

        private Image Crop(int? x, int? y, int? width, int? height, float scaleFactor = 1.0f)
        {
            if (!_images.TryGetValue(scaleFactor, out var image))
            {
                throw new KeyNotFoundException($"Missing scaleFactor = {scaleFactor}");
            }

            x ??= 0;
            y ??= 0;

            x = Convert.ToInt32(x * scaleFactor);
            y = Convert.ToInt32(y * scaleFactor);

            width ??= image.Width;
            height ??= image.Height;

            width = Convert.ToInt32(width * scaleFactor);
            height = Convert.ToInt32(height * scaleFactor);

            return image.Clone(c => c.Crop(new SixLabors.ImageSharp.Rectangle(x.Value, y.Value, width.Value, height.Value)));
        }

        internal Dictionary<float,string> GetAllScaledImages()
        {
            var dict = new Dictionary<float,string>();
            try
            {
                foreach (var (scale, image) in _images)
                {
                    dict.Add(scale, ToBase64Image(image));
                }
            }
            catch (Exception ex)
            {
                BridgeConnector.LogError(ex, "Error getting scaled images");
            }
            
            return dict;
        }

        private string ToBase64Image(Image source)
        {
            using var stream = new MemoryStream();
            source.Save(stream, PngFormat.Instance);

            // Always available.
            stream.TryGetBuffer(out ArraySegment<byte> buffer);
            return Convert.ToBase64String(buffer.Array, 0, (int)stream.Length);
        }

        internal Image GetScale(float scaleFactor)
        {
            if (_images.TryGetValue(scaleFactor, out var image))
            {
                return image;
            }

            return null;
        }
    }
}
