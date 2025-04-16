'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function GNSSAntennas() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link href="/" className="inline-block mb-8 text-blue-600 hover:text-blue-800">
          ← Back to Portfolio
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">GNSS Antennas</h1>
        
        <div className="space-y-12">
          {/* GNSS Patch Antenna */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/images/2a. GNSS_patch.png"
                alt="GNSS Patch Antenna"
                width={600}
                height={400}
                className="rounded-lg object-contain"
                priority
              />
              <h3 className="text-xl font-semibold text-gray-800">GNSS Patch Antenna</h3>
            </div>
          </div>

          {/* GNSS Cross Dipole Antenna */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/images/2b_GNSS_CrossDipole.png"
                alt="GNSS Cross Dipole Antenna"
                width={600}
                height={400}
                className="rounded-lg object-contain"
                priority
              />
              <h3 className="text-xl font-semibold text-gray-800">GNSS Cross Dipole Antenna</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 