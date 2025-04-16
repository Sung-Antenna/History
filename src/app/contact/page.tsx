import Image from 'next/image';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start space-x-6 mb-8">
            <Image
              src="/images/me.png"
              alt="Sungbin Mun"
              width={120}
              height={120}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sungbin Mun</h2>
              <p className="text-gray-600">Specialized in designing and developing cutting-edge antenna solutions</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a href="mailto:seoulbea@gmail.com" className="text-blue-600 hover:text-blue-800">
                  seoulbea@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-800">home: Eindhoven, Netherlands</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth={2} />
              </svg>
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <a href="https://www.linkedin.com/in/sungbin-mun-a215a2b3/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  Sungbin Mun
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 