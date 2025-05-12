'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Sungbin Mun</h1>
                <p className="text-gray-600 mt-1">Specialized in designing and developing cutting-edge antenna solutions</p>
              </div>
              <Image
                src="/images/me.png"
                alt="Sungbin Mun"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <div className="flex space-x-8">
              <Link href="/patents" className="text-gray-700 hover:text-gray-900 font-medium">
                Patents
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - 3 Sections */}
            <div className="space-y-8">
              <Link href="/embedded" className="group block">
                <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-4">Embedded Antennas</h3>
                  <Image
                    src="/images/1. Embedded Antennas.png"
                    alt="Embedded Antennas"
                    width={400}
                    height={300}
                    className="rounded-lg w-full"
                    priority
                  />
                </div>
              </Link>

              <Link href="/gnss" className="group block">
                <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-4">GNSS Antennas</h3>
                  <Image
                    src="/images/2. GNSS.png"
                    alt="GNSS Antennas"
                    width={400}
                    height={300}
                    className="rounded-lg w-full"
                    priority
                  />
                </div>
              </Link>

              <Link href="/custom" className="group block">
                <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-4">Customized Antennas</h3>
                  <Image
                    src="/images/4. Custom Antennas.png"
                    alt="Customized Antennas"
                    width={400}
                    height={300}
                    className="rounded-lg w-full"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right Column - Phased Array */}
            <div className="h-full">
              <Link href="/phased-array" className="group block h-full">
                <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-4">Phased Array Antennas</h3>
                  <Image
                    src="/images/3. Array.png"
                    alt="Phased Array Antennas"
                    width={400}
                    height={900}
                    className="rounded-lg w-full h-full object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Questions... Section */}
        <section className="mb-16">
          <Link href="/service-request" className="group">
            <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 mb-2">Antenna Service Request</h2>
              <p className="text-gray-600 mb-4">
                My experience includes a history of designing various LTE embedded antennas. from LTE700, LTE600 to LTE450 recently. For inquiries, please feel free to reach out to seoulbea@gmail.com
              </p>
            </div>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-8 py-6 mt-12 border-t border-gray-200">
        <p className="text-center text-gray-600">&copy; 2024 Sungbin Mun. All rights reserved.</p>
      </footer>
    </div>
  );
}
