import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-white mb-3">
            Payment Successful!
          </h1>
          
          <p className="text-gray-400 mb-8">
            You're now enrolled in the course. Start learning!
          </p>
          
          <div className="space-y-3">
            <Link to="/student/dashboard">
              <Button className="w-full">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="w-full">
                Browse More Courses
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
