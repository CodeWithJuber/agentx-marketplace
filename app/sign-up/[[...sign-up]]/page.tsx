import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Create Your Account</h1>
          <p className="text-gray-400">Join 10,000+ creators earning from AI agents</p>
        </div>
        
        <div className="mb-6 p-4 rounded-xl bg-accent-500/10 border border-accent-500/20">
          <p className="text-sm text-accent-400 text-center">
            🎁 Launch Bonus: Get 20% lifetime commission on all referrals!
          </p>
        </div>
        
        <SignUp 
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'bg-gray-900 border border-white/10',
              headerTitle: 'text-white',
              headerSubtitle: 'text-gray-400',
              socialButtonsBlockButton: 'bg-white/5 border-white/10 hover:bg-white/10',
              socialButtonsBlockButtonText: 'text-white',
              dividerLine: 'bg-white/10',
              dividerText: 'text-gray-400',
              formFieldLabel: 'text-gray-300',
              formFieldInput: 'bg-white/5 border-white/10 text-white',
              formButtonPrimary: 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500',
              footerActionText: 'text-gray-400',
              footerActionLink: 'text-primary-400 hover:text-primary-300',
            },
          }}
        />
      </div>
    </div>
  );
}