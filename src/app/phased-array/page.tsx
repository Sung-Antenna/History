'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PhasedArrayAntennas() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-block mb-8 text-blue-600 hover:text-blue-800">
          ← Back to Portfolio
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">Phased Array Antennas</h1>

        {/* Phased Array Antennas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Humatics Antenna */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <Image
                  src="/images/3a. Humatics.png"
                  alt="Humatics Phased Array Antenna"
                  width={500}
                  height={600}
                  className="rounded-lg w-full object-contain"
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mt-4">Humatics Phased Array Antenna</h3>
            </div>
          </div>

          {/* KMW Omni Antenna */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <Image
                  src="/images/3b. KMW_Omni.png"
                  alt="KMW Omni Antenna"
                  width={500}
                  height={600}
                  className="rounded-lg w-full object-contain"
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mt-4">KMW Omni Antenna</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 