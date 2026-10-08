export type SubscriptionPlanType = 'monthly' | 'yearly' | 'admin_lifetime' | 'none';

export interface PaymentRequest {
  requestId: string;
  userId: string;
  doctorName: string;
  doctorEmail: string;
  bmdcRegNumber?: string;
  plan: 'monthly' | 'yearly';
  amount: number;
  senderNumber: string;
  transactionId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: unknown;
  reviewedAt?: unknown;
  adminNote?: string;
}

export const BKASH_CONFIG = {
  walletNumber: '01670175663',
  walletType: 'Personal (Send Money / সেন্ড মানি)',
  plans: {
    monthly: {
      id: 'monthly',
      name: 'মাসিক প্ল্যান (Monthly)',
      price: 100,
      durationDays: 30,
      badge: 'জনপ্রিয়',
      description: '১ মাসের জন্য আনলিমিটেড ডোজ ক্যালকুলেশন ও গাইডলাইন অ্যাক্সেস'
    },
    yearly: {
      id: 'yearly',
      name: 'বাৎসরিক প্ল্যান (Annual)',
      price: 1000,
      durationDays: 365,
      badge: 'সেরা অফার (৳২০০ সাশ্রয়)',
      description: '১২ মাসের জন্য ফুল লাইসেন্স, জরুরি ক্র্যাশ শিট ও অগ্রাধিকার সাপোর্ট'
    }
  }
} as const;
