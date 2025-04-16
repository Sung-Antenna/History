'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Patents() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-block mb-8 text-blue-600 hover:text-blue-800">
          ← Back to Portfolio
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">Patents</h1>

        {/* Patents Grid */}
        <div className="space-y-8">
          {/* SMD Patent */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <Image
                src="/images/9a. Patent_SMD.png"
                alt="SMD Patent"
                width={600}
                height={400}
                className="rounded-lg shadow-md w-full"
              />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">Surface Mount Device (SMD) Patent</h2>
                <p className="text-gray-600">
                  Patent Application: <a href="https://patentcenter.uspto.gov/applications/18495319" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USPTO Application 18495319</a>
                </p>
                <p className="text-gray-600">Expected Grant: 2025</p>
                <p className="text-gray-600">Jurisdiction: United States</p>
              </div>
            </div>
          </div>

          {/* Internal Antenna Patent 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <Image
                src="/images/9b. Patent_Internal Ant.png"
                alt="Internal Antenna Patent"
                width={600}
                height={400}
                className="rounded-lg shadow-md w-full"
              />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">Internal Antenna Patent</h2>
                <p className="text-gray-600">Compact High performing Antenna for folder and slide type handset Application</p>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/9z-Kipo-logo.png"
                    alt="KIPO Logo"
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <p className="text-gray-600">Registration Number: 100718642</p>
                </div>
                <p className="text-gray-600">Year: 2007</p>
                <p className="text-gray-600">Jurisdiction: Korea (대한민국 특허)</p>
                <p className="text-gray-600">특허청: 한국특허청(KIPO)</p>
                <p className="text-gray-600">특허명: 폴더 및 슬라이드형 단말기용 소형 고성능 안테나</p>
              </div>
            </div>
          </div>

          {/* Internal Antenna Patent 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <Image
                src="/images/9c. Patent_Internal Ant2.png"
                alt="Internal Antenna Patent 2"
                width={600}
                height={400}
                className="rounded-lg shadow-md w-full"
              />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">Internal Antenna for Mobile Communication</h2>
                <p className="text-gray-600">Internal antenna for a mobile communication device</p>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/9z-Kipo-logo.png"
                    alt="KIPO Logo"
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <p className="text-gray-600">Registration Number: 10-0701868-0000</p>
                </div>
                <p className="text-gray-600">Year: 2006</p>
                <p className="text-gray-600">Jurisdiction: Korea (대한민국 특허)</p>
                <p className="text-gray-600">특허청: 한국특허청(KIPO)</p>
                <p className="text-gray-600">특허명: 이동통신 단말기용 내장형 안테나</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 