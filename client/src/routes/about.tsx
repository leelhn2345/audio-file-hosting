import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  Target,
  Award,
  Users,
  Globe,
  Headphones,
  Mic,
  Music,
  Shield,
  Zap,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  Code,
  Settings,
  BarChart3,
} from "lucide-react";
import { useAtomValue } from "jotai";
import { userAtom } from "@stores/user";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
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

        <div className="relative mx-auto max-w-4xl text-center">
          <Badge
            variant="secondary"
            className="mb-8 bg-purple-100 text-purple-800 hover:bg-purple-200"
          >
            <Heart className="mr-2 h-4 w-4" />
            Built with passion for creators
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Empowering{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Audio Creators
            </span>
            <br />
            Worldwide
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            We believe every voice deserves to be heard. Our mission is to
            provide the most powerful, secure, and user-friendly platform for
            audio creators to share their stories with the world.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Our Story
              </h2>
              <div className="space-y-4 leading-relaxed text-gray-600">
                <p>
                  Founded in 2025, our platform was born from a simple
                  frustration: existing audio hosting solutions were either too
                  expensive, too complicated, or simply didn't meet the needs of
                  modern creators.
                </p>
                <p>
                  As musicians and podcasters ourselves, we experienced
                  firsthand the challenges of sharing audio content online. We
                  wanted something that was fast, secure, affordable, and built
                  specifically for creators who take their craft seriously.
                </p>
                <p>
                  Today, we're proud to serve over 10,000 creators worldwide,
                  from bedroom producers to Grammy-winning artists, from indie
                  podcasters to major media companies.
                </p>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600
                  opacity-20 blur"
              ></div>
              <Card className="relative shadow-2xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="mb-2 text-4xl font-bold text-purple-600">
                        10K+
                      </div>
                      <div className="text-sm text-gray-600">
                        Active Creators
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="mb-2 text-4xl font-bold text-blue-600">
                        1M+
                      </div>
                      <div className="text-sm text-gray-600">Files Hosted</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-2 text-4xl font-bold text-green-600">
                        50+
                      </div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-2 text-4xl font-bold text-orange-600">
                        99.9%
                      </div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Mission & Vision
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We're not just building a platform - we're building the future of
              audio sharing
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <Card className="relative overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
              <div
                className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br
                  from-purple-400 to-purple-600 opacity-10"
              ></div>
              <CardContent className="p-8">
                <Target className="mb-4 h-12 w-12 text-purple-600" />
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
                <p className="leading-relaxed text-gray-700">
                  To democratize audio sharing by providing creators with
                  professional-grade tools that are accessible, affordable, and
                  incredibly easy to use. We believe that technical barriers
                  should never stand between a creator and their audience.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
              <div
                className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br
                  from-blue-400 to-blue-600 opacity-10"
              ></div>
              <CardContent className="p-8">
                <Globe className="mb-4 h-12 w-12 text-blue-600" />
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Our Vision
                </h3>
                <p className="leading-relaxed text-gray-700">
                  To become the world's most trusted audio hosting platform,
                  where every creator - from hobbyists to professionals - can
                  share their voice with confidence, knowing their content is
                  secure, accessible, and delivered with the highest quality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-purple-100 to-purple-200 transition-transform
                  duration-300 group-hover:scale-110"
              >
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Security First
              </h3>
              <p className="text-sm text-gray-600">
                Your content is protected with enterprise-grade security and
                encryption
              </p>
            </div>

            <div className="group text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-blue-100 to-blue-200 transition-transform duration-300
                  group-hover:scale-110"
              >
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Lightning Fast
              </h3>
              <p className="text-sm text-gray-600">
                Optimized for speed with global CDN and instant file processing
              </p>
            </div>

            <div className="group text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-green-100 to-green-200 transition-transform duration-300
                  group-hover:scale-110"
              >
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Creator-Centric
              </h3>
              <p className="text-sm text-gray-600">
                Built by creators, for creators. Every feature serves your needs
              </p>
            </div>

            <div className="group text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-orange-100 to-orange-200 transition-transform
                  duration-300 group-hover:scale-110"
              >
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Excellence
              </h3>
              <p className="text-sm text-gray-600">
                We never compromise on quality and continuously improve our
                platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              The passionate individuals behind the platform
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <Avatar className="mx-auto mb-4 h-20 w-20">
                  <AvatarImage src="" alt="Alex Chen" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-lg text-white">
                    <Music className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Alex Chen
                </h3>
                <p className="mb-3 text-purple-600">CEO & Co-Founder</p>
                <p className="text-sm text-gray-600">
                  Former music producer turned tech entrepreneur. 10+ years in
                  audio technology and startup experience.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <Avatar className="mx-auto mb-4 h-20 w-20">
                  <AvatarImage src="" alt="Sarah Martinez" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-lg text-white">
                    <Headphones className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Sarah Martinez
                </h3>
                <p className="mb-3 text-blue-600">CTO & Co-Founder</p>
                <p className="text-sm text-gray-600">
                  Full-stack engineer with expertise in distributed systems and
                  audio processing. Previously at Spotify.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <Avatar className="mx-auto mb-4 h-20 w-20">
                  <AvatarImage src="" alt="Marcus Johnson" />
                  <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-lg text-white">
                    <Mic className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Marcus Johnson
                </h3>
                <p className="mb-3 text-green-600">Head of Product</p>
                <p className="text-sm text-gray-600">
                  Podcaster and UX designer focused on creating intuitive
                  experiences for content creators.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <Avatar className="mx-auto mb-4 h-20 w-20">
                  <AvatarImage src="" alt="Emily Rodriguez" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-lg text-white">
                    <Code className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Emily Rodriguez
                </h3>
                <p className="mb-3 text-orange-600">Lead Developer</p>
                <p className="text-sm text-gray-600">
                  Frontend specialist with a passion for performance
                  optimization and accessibility. Former Google engineer.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <Avatar className="mx-auto mb-4 h-20 w-20">
                  <AvatarImage src="" alt="David Kim" />
                  <AvatarFallback className="bg-gradient-to-br from-pink-400 to-pink-600 text-lg text-white">
                    <Settings className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  David Kim
                </h3>
                <p className="mb-3 text-pink-600">Head of Operations</p>
                <p className="text-sm text-gray-600">
                  Infrastructure and DevOps expert ensuring 99.9% uptime.
                  Previously led platform operations at SoundCloud.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <Avatar className="mx-auto mb-4 h-20 w-20">
                  <AvatarImage src="" alt="Jessica Wu" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-indigo-600 text-lg text-white">
                    <BarChart3 className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Jessica Wu
                </h3>
                <p className="mb-3 text-indigo-600">Head of Growth</p>
                <p className="text-sm text-gray-600">
                  Data-driven marketing strategist helping creators reach their
                  audience. Former growth lead at Bandcamp.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Achievements
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Milestones that mark our journey
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-purple-100 to-purple-200"
              >
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mb-2 text-3xl font-bold text-gray-900">500%</div>
              <div className="text-sm text-gray-600">Growth in 2024</div>
            </div>

            <div className="text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-blue-100 to-blue-200"
              >
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mb-2 text-3xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>

            <div className="text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-green-100 to-green-200"
              >
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <div className="mb-2 text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support Response</div>
            </div>

            <div className="text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-orange-100 to-orange-200"
              >
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <div className="mb-2 text-3xl font-bold text-gray-900">
                ISO 27001
              </div>
              <div className="text-sm text-gray-600">Certified Security</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Join Our Community?
            </h2>
            <p className="mb-8 text-xl text-purple-100">
              Be part of a platform that truly understands creators
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white px-8 py-4 text-lg font-semibold text-purple-600 hover:bg-gray-100"
              >
                <Link to="/register">Start Creating Today</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white px-8 py-4 text-lg text-purple-600 hover:bg-gray-100
                  hover:text-purple-600"
              >
                <Link to="/">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
