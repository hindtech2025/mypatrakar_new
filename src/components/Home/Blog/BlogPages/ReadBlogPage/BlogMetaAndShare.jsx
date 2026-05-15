
import noProfile from "../../../../../assets/footer/noProfile.png"
import { useContext } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaShareAlt,
} from "react-icons/fa";
import { BlogContext } from "../../../../../context/BlogContext";
import { formatDateToReadable } from "../../../../../utils/formatDateToReadable";

const BlogMetaAndShare = () => {
  const { blog } = useContext(BlogContext);
  const authorName = "Admin";
  const date = formatDateToReadable(blog?.blogs_date)||"April 30, 2025";
  const readTime = "5 min read";
  const image=noProfile;

  const pageUrl = window.location.href;

  // ⭐ Your custom professional message
  const shareMessage = `
📰 Shared via My Patrakar — India’s smart digital news portal platform.

📌 “${blog.short_description}”
🔗 Read Full Article: ${pageUrl}

My Patrakar helps individuals, journalists, and organizations launch their own news portals instantly.

📩 Email: support@mypatrakar.in
📞 Contact: +91-9876543210

🚀 Build your own news portal today with My Patrakar!
  `;

  const encodedMessage = encodeURIComponent(shareMessage);
  const encodedUrl = encodeURIComponent(pageUrl);

  // Share click handler
  const handleShare = (platform) => {
    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`;
        break;

      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
        break;

      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&summary=${encodedMessage}`;
        break;

      case "webshare":
        if (navigator.share) {
          navigator.share({
            title: blog.short_description,
            text: shareMessage,
            url: pageUrl,
          });
          return;
        }
        alert("Sharing not supported on this device.");
        return;

      default:
        return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      {/* Meta Section */}
      <div className="flex items-center space-x-3">
        <img
          className="w-12 h-12 rounded-full object-cover bg-gray-300"
          src={image}
          alt={authorName}
        />
        <div>
          <p className="text-lg font-bold text-gray-800">{authorName}</p>
          <p className="text-sm text-gray-500">
            {date} • {readTime}
          </p>
        </div>
      </div>

      {/* Share Section */}
      <div className="flex items-center space-x-6 text-gray-400">
        <button
          onClick={() => handleShare("facebook")}
          className="hover:text-gray-700"
        >
          <FaFacebookF className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleShare("twitter")}
          className="hover:text-gray-700"
        >
          <FaTwitter className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleShare("linkedin")}
          className="hover:text-gray-700"
        >
          <FaLinkedinIn className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleShare("webshare")}
          className="hover:text-gray-700"
        >
          <FaShareAlt className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BlogMetaAndShare;
