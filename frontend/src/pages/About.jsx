import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="bg-gray-50 p-8 sm:p-12 text-gray-800">

      <div className="text-center text-4xl ">
      <h2 className="text-3xl font-bold text-emerald-700 mb-4"><span className="text-emerald-500">About</span> US</h2>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px] rounded-lg shadow-lg" src={assets.about_image} alt="About Us" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-800">
          <p>Welcome to Healers! We&apos;re dedicated to connecting individuals with trusted, qualified healthcare professionals who provide compassionate and effective care. Our mission is to make healthcare accessible, convenient, and tailored to your unique needs.</p>
          <p>At Healers, we believe in empowering people to take charge of their health and wellness journey. Our platform offers a diverse network of specialists across various fields, enabling you to find the right healer for your specific concerns—whether it&apos;s a routine check-up, mental health support, or holistic treatments.</p>
          <b className="text-xl text-emerald-700">Our Vision</b>
          <p>At Healers, our vision is to create a world where quality healthcare and wellness support are within reach for everyone, regardless of location or circumstance. We aim to be the bridge between individuals and compassionate, skilled healthcare providers who foster holistic healing and well-being.</p>
          <p>We envision a future where seeking care is seamless, personal, and empowering, allowing individuals to connect with the right professionals who understand their needs. By embracing innovation and empathy, we strive to make Healers a trusted partner in every person&apos;s journey to health, healing, and a balanced life.</p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>Why Choose <b className="text-emerald-500">H</b><span className="text-primary">ealers</span><b className="text-emerald-500">?</b></p>
      </div>

      <div className="grid gap-5 mb-20 px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 border border-gray-300 rounded-lg transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-600 hover:shadow-md">
            <p className="text-xl text-primary">Trusted Professionals</p>
            <p>Our network includes only thoroughly vetted and licensed healthcare providers, ensuring you receive care from professionals you can trust.</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-600 hover:shadow-md">
            <p className="text-xl text-primary">Comprehensive Care Options</p>
            <p>Whether you’re seeking medical specialists, mental health support, or alternative therapies, Healers offers a wide range of providers to meet your specific health and wellness needs.</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-600 hover:shadow-md">
            <p className="text-xl text-primary">Easy, Convenient Access</p>
            <p>Booking an appointment has never been easier. Our user-friendly platform lets you find, book, and manage appointments from anywhere, anytime.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div className="p-6 border border-gray-300 rounded-lg transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-600 hover:shadow-md">
            <p className="text-xl text-primary">Personalized Approach</p>
            <p>We recognize that everyone’s journey to health is unique. Healers helps you find providers who understand your needs and provide individualized care.</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-600 hover:shadow-md">
            <p className="text-xl text-primary">Commitment to Quality</p>
            <p>We prioritize your satisfaction and well-being by continually improving our services and ensuring high standards of care across all providers on our platform.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
