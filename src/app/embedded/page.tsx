'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function EmbeddedAntennas() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <Link href="/" className="inline-block mb-8 text-blue-600 hover:text-blue-800">
          ← Back to Portfolio
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Embedded Antennas</h1>
        
        {/* Digikey Links */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Available Products on Digikey:</h2>
          <div className="space-y-2">
            <a 
              href="https://www.digikey.nl/en/products/detail/the-antenna-company/AC31700-01A/22026530" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-800 hover:underline"
            >
              [LTE700] Standalone
            </a>
            <a 
              href="https://www.digikey.nl/en/products/detail/the-antenna-company/AC31700-01B/22026531" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-800 hover:underline"
            >
              [LTE700] Booster
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Row - 1a */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <Image
                src="/images/1a. [LTE700] Standalone.png"
                alt="LTE700 Standalone"
                width={500}
                height={400}
                className="rounded-lg w-full"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">[LTE700] Standalone</h3>
            </div>
          </div>

          {/* First Row - 1b */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <Image
                src="/images/1b. [LTE700] Standalone + Booster.png"
                alt="LTE700 Standalone + Booster"
                width={500}
                height={400}
                className="rounded-lg w-full"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">[LTE700] Standalone + Booster</h3>
            </div>
          </div>

          {/* Second Row - 1c */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <Image
                src="/images/1c. [LTE600] Standalone.png"
                alt="LTE600 Standalone"
                width={500}
                height={400}
                className="rounded-lg w-full"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">[LTE600] Standalone</h3>
            </div>
          </div>

          {/* Second Row - 1d */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <Image
                src="/images/1d. [LTE700] Standalone + Booster, CNKTD.png"
                alt="LTE700 Standalone + Booster, CNKTD"
                width={500}
                height={400}
                className="rounded-lg w-full"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">[LTE700] Standalone + Booster, CNKTD</h3>
            </div>
          </div>

          {/* Third Row - 1e */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <Image
                src="/images/1e. [LTE700] PCB Layout.png"
                alt="LTE700 PCB Layout"
                width={500}
                height={400}
                className="rounded-lg w-full"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">[LTE700] PCB Layout</h3>
            </div>
          </div>

          {/* Third Row - 1f */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <Image
                src="/images/1f. [LTE700] PCB Layout.png"
                alt="LTE700 PCB Layout"
                width={500}
                height={400}
                className="rounded-lg w-full"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">[LTE700] PCB Layout</h3>
            </div>
          </div>

          {/* Fourth Row - 1g */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <Image
                src="/images/1g. [LTE700] PCB Layout.png"
                alt="LTE700 PCB Layout"
                width={500}
                height={400}
                className="rounded-lg w-full"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">[LTE700] PCB Layout</h3>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
} 
