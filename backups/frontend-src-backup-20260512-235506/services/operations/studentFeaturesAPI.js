import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { studentEndpoints } from "../apis"
import { setPaymentLoading } from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice"

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints

// Load the Razorpay SDK
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export async function BuyCourse(
  token,
  courses,
  user_details,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...")
  try {
    // Loading the script of Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your Internet Connection."
      )
      return
    }

    // Initiating the order in Backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      {
        courses,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }
    console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)

    // Opening Razorpay SDK (DUMMY for now, but keeping the flow)
    // In a real scenario, you'd use the orderId from orderResponse.data
    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.currency,
      amount: `${orderResponse.data.totalAmount}`,
      order_id: orderResponse.data.orderId,
      name: "EdTech Platform",
      description: "Thank you for purchasing the course.",
      prefill: {
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(response, orderResponse.data.totalAmount, token)
        verifyPayment({ ...response, courses }, token, navigate, dispatch)
      },
    }

    // For DUMMY flow, we skip actual Razorpay popup and call handler directly
    // This makes it "working" for the user without real credentials
    setTimeout(() => {
        const response = {
            razorpay_payment_id: "pay_dummy_" + Date.now(),
            razorpay_order_id: orderResponse.data.orderId,
            razorpay_signature: "sig_dummy_" + Date.now()
        };
        options.handler(response);
    }, 1000);

  } catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error("Could Not make Payment")
  }
  toast.dismiss(toastId)
}

// Verify Payment
async function verifyPayment(body, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...")
  dispatch(setPaymentLoading(true))
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, body, {
      Authorization: `Bearer ${token}`,
    })

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful. You are Added to the course")
    navigate("/dashboard/enrolled-courses")
    dispatch(resetCart())
  } catch (error) {
    console.log("PAYMENT VERIFICATION ERROR............", error)
    toast.error("Could Not Verify Payment")
  }
  toast.dismiss(toastId)
  dispatch(setPaymentLoading(false))
}

// Send Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
  }
}
