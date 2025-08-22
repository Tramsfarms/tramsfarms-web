declare module "paystack-react" {
  import React from "react";

  export interface PaystackProps {
    publicKey: string;
    email: string;
    amount: number;
    reference?: string;
  }

  export interface PaystackConsumerProps extends PaystackProps {
    children: (arg: Record<string, any>) => any;
    onSuccess?: (reference: any) => void; // Override to expect an argument
    onClose?: () => void;
  }

  export const PaystackConsumer: React.FC<PaystackConsumerProps>;
}
