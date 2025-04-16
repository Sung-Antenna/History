'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CustomizedAntennas() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-block mb-8 text-blue-600 hover:text-blue-800">
          ← Back to Portfolio
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">Customized Antennas</h1>

        {/* Custom Antennas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* XG-46 Xirgo */}
          <div className="space-y-4">
            <Image
              src="/images/4a. XG-46_Xirgo.png"
              alt="XG-46 Xirgo Antenna"
              width={400}
              height={300}
              className="rounded-lg shadow-md w-full"
              priority
            />
            <p className="text-gray-600 text-center font-semibold">XG-46 Xirgo Antenna</p>
          </div>

          {/* Dexcom */}
          <div className="space-y-4">
            <Image
              src="/images/4b. Dexcom.png"
              alt="Dexcom Antenna"
              width={400}
              height={300}
              className="rounded-lg shadow-md w-full"
              priority
            />
            <p className="text-gray-600 text-center font-semibold">Dexcom Antenna</p>
          </div>

          {/* Tunable Antenna */}
          <div className="space-y-4">
            <Image
              src="/images/4c. Tunable Antenna.png"
              alt="Tunable Antenna"
              width={400}
              height={300}
              className="rounded-lg shadow-md w-full"
              priority
            />
            <p className="text-gray-600 text-center font-semibold">Tunable Antenna</p>
          </div>

          {/* Hit Products */}
          <div className="space-y-4">
            <Image
              src="/images/4d. Hit Products.png"
              alt="Hit Products Antenna"
              width={400}
              height={300}
              className="rounded-lg shadow-md w-full"
              priority
            />
            <p className="text-gray-600 text-center font-semibold">Hit Products Antenna</p>
          </div>
        </div>
      </div>
    </div>
  );
} 