import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Headphones,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Send,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br
                  from-purple-600 to-blue-600"
              >
                <Headphones className="h-5 w-5 text-white" />
              </div>
              <span
                className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-bold
                  text-transparent"
              >
                AudioHost
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              The ultimate platform for musicians, podcasters, and audio
              creators. Share your voice with the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-purple-400"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-purple-400"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-purple-400"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-purple-400"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Product</h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                Features
              </Link>
              <Link
                to="/"
                className="block text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                Pricing
              </Link>
              <Link
                to="/"
                className="block text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                Upload
              </Link>
              <Link
                to="/"
                className="block text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                Analytics
              </Link>
              <Link
                to="/"
                className="block text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                API
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Company</h3>
            <div className="space-y-2">
              <Link
                to="/about"
                className="block text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                About Us
              </Link>
              <Link
                to="/"
                className="block text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                Careers
              </Link>
              <Link
                to="/"
                className="block text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                Blog
              </Link>
              <Link
                to="/"
                className="block text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                Press
              </Link>
              <Link
                to="/"
                className="block text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Stay Updated</h3>
            <p className="text-sm text-gray-400">
              Get the latest updates, tips, and exclusive content delivered to
              your inbox.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500
                    focus:border-purple-400"
                />
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 px-3 hover:from-purple-700
                    hover:to-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-gray-400">
            © 2025 AudioHost. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm md:justify-end">
            <Link
              to="/"
              className="text-gray-400 transition-colors hover:text-purple-400"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="text-gray-400 transition-colors hover:text-purple-400"
            >
              Terms of Service
            </Link>
            <Link
              to="/"
              className="text-gray-400 transition-colors hover:text-purple-400"
            >
              Cookie Policy
            </Link>
            <Link
              to="/"
              className="text-gray-400 transition-colors hover:text-purple-400"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

