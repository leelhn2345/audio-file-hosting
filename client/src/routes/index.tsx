import { userAtom } from "@stores/user";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { Button } from "@/components/ui/button";
import {
  Play,
  Upload,
  Share2,
  Shield,
  Zap,
  Users,
  Music,
  Download,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const user = useAtomValue(userAtom);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-32">
        <div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br
            from-purple-400 to-pink-400 opacity-20 blur-3xl"
        ></div>
        <div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br
            from-blue-400 to-cyan-400 opacity-20 blur-3xl"
        ></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm
                font-medium text-purple-800"
            >
              <Star className="h-4 w-4" />
              <span>Trusted by 10,000+ creators</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Host, Share & Stream
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Audio Files
              </span>
              <br />
              Like Never Before
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              The ultimate platform for musicians, podcasters, and audio
              creators. Upload, organize, and share your audio content with
              lightning-fast streaming and professional-grade security.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              {user ? (
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg text-white
                    hover:from-purple-700 hover:to-blue-700"
                >
                  <Link to="/dashboard">
                    <Play className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg text-white
                      hover:from-purple-700 hover:to-blue-700"
                  >
                    <Link to="/register">
                      <Upload className="mr-2 h-5 w-5" />
                      Start Free
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 px-8 py-4 text-lg"
                  >
                    <Link to="/login">
                      <Play className="mr-2 h-5 w-5" />
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <div className="mt-12 flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600
                    opacity-30 blur"
                ></div>
                <div className="relative rounded-2xl bg-white p-8 shadow-2xl">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        10TB+
                      </div>
                      <div className="text-sm text-gray-500">
                        Storage Available
                      </div>
                    </div>
                    <div className="h-12 w-px bg-gray-200"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        99.9%
                      </div>
                      <div className="text-sm text-gray-500">Uptime</div>
                    </div>
                    <div className="h-12 w-px bg-gray-200"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        24/7
                      </div>
                      <div className="text-sm text-gray-500">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to manage your audio
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Professional tools designed for creators who demand the best
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50
                to-purple-100 p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div
                className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br
                  from-purple-400 to-purple-600 opacity-10"
              ></div>
              <Upload className="mb-4 h-12 w-12 text-purple-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Lightning Fast Upload
              </h3>
              <p className="text-gray-600">
                Drag & drop your files for instant upload with our optimized
                compression and processing.
              </p>
            </div>

            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50
                to-blue-100 p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div
                className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br
                  from-blue-400 to-blue-600 opacity-10"
              ></div>
              <Share2 className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Smart Sharing
              </h3>
              <p className="text-gray-600">
                Generate secure, customizable links with advanced privacy
                controls and analytics.
              </p>
            </div>

            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50
                to-green-100 p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div
                className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br
                  from-green-400 to-green-600 opacity-10"
              ></div>
              <Shield className="mb-4 h-12 w-12 text-green-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Enterprise Security
              </h3>
              <p className="text-gray-600">
                Military-grade encryption and secure storage with automatic
                backups and version control.
              </p>
            </div>

            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50
                to-orange-100 p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div
                className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br
                  from-orange-400 to-orange-600 opacity-10"
              ></div>
              <Zap className="mb-4 h-12 w-12 text-orange-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                High-Speed Streaming
              </h3>
              <p className="text-gray-600">
                Global CDN ensures your audio loads instantly anywhere in the
                world with zero buffering.
              </p>
            </div>

            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50
                to-pink-100 p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div
                className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br
                  from-pink-400 to-pink-600 opacity-10"
              ></div>
              <Users className="mb-4 h-12 w-12 text-pink-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Team Collaboration
              </h3>
              <p className="text-gray-600">
                Work together with advanced permission controls, comments, and
                real-time collaboration tools.
              </p>
            </div>

            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50
                to-indigo-100 p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div
                className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br
                  from-indigo-400 to-indigo-600 opacity-10"
              ></div>
              <Music className="mb-4 h-12 w-12 text-indigo-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Audio Player
              </h3>
              <p className="text-gray-600">
                Beautiful, customizable audio player with waveform visualization
                and advanced controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to revolutionize your audio workflow?
          </h2>
          <p className="mt-4 text-xl text-purple-100">
            Join thousands of creators who trust us with their audio content
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            {!user && (
              <>
                <Button
                  asChild
                  size="lg"
                  className="bg-white px-8 py-4 text-lg font-semibold text-purple-600 hover:bg-gray-100"
                >
                  <Link to="/register">
                    <Download className="mr-2 h-5 w-5" />
                    Get Started Free
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white px-8 py-4 text-lg text-white hover:bg-white hover:text-purple-600"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            <div>
              <div className="text-3xl font-bold text-white">Free</div>
              <div className="text-purple-200">No credit card required</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">5GB</div>
              <div className="text-purple-200">Storage to start</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">Instant</div>
              <div className="text-purple-200">Setup in seconds</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
