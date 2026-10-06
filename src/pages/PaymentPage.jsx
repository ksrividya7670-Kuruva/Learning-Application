import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RefreshCw, FileText, CheckCircle2, ShieldCheck, Lock, Gift, Copy, Users, Star } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { validateReferralCode, registerReferral, generateReferralCode, getReferralRecord, getAvailableFreeCourses, claimFreeCourse } from '../lib/referralSystem';

// Detect currency based on browser timezone/locale
const detectCurrency = () => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const locale = navigator.language || '';
  if (tz.includes('Asia/Kolkata') || tz.includes('Asia/Calcutta') || locale.startsWith('en-IN')) {
    return { code: 'INR', symbol: '₹', rate: 1 };
  }
  if (tz.includes('Asia/Dubai') || tz.includes('Asia/Riyadh')) {
    return { code: 'USD', symbol: '$', rate: 0.012 };
  }
  if (tz.includes('Europe/')) {
    return { code: 'EUR', symbol: '€', rate: 0.011 };
  }
  if (tz.includes('America/')) {
    return { code: 'USD', symbol: '$', rate: 0.012 };
  }
  return { code: 'INR', symbol: '₹', rate: 1 };
};

const PaymentPage = ({ onBack, user }) => {
  const [courseName, setCourseName] = useState('Python');
  const [showPayPal, setShowPayPal] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [appliedReferralCode, setAppliedReferralCode] = useState('');
  const [useFreeCourse, setUseFreeCourse] = useState(false);
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹', rate: 1 });
  const [paymentDone, setPaymentDone] = useState(false);
  const [myReferralCode, setMyReferralCode] = useState('');
  const [referralRecord, setReferralRecord] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrency(detectCurrency());
    const state = window.history.state;
    if (state && state.course) setCourseName(state.course);
  }, []);

  // After payment: show the user's own referral card
  useEffect(() => {
    if (paymentDone && user?.email) {
      const code = generateReferralCode(user.email, courseName);
      setMyReferralCode(code);
      setReferralRecord(getReferralRecord(user.email));
    }
  }, [paymentDone, user, courseName]);

  useEffect(() => {
    if (user?.email) {
      const record = getReferralRecord(user.email);
      setReferralRecord(record);
    }
  }, [user]);

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponMsg('');
    const trimmed = coupon.trim();
    const buyerEmail = user?.email || '';
    const result = validateReferralCode(trimmed, buyerEmail);
    if (result.valid) {
      setAppliedCoupon(true);
      setAppliedReferralCode(trimmed);
      setCouponMsg(result.message);
    } else {
      setCouponError(result.message);
    }
  };

  const referralDiscount = appliedCoupon && !useFreeCourse ? 200 : 0;
  const finalPrice = useFreeCourse ? 0 : 499 - referralDiscount;
  const convertedPrice = currency.code === 'INR'
    ? finalPrice
    : parseFloat((finalPrice * currency.rate).toFixed(2));
  const convertedOriginal = currency.code === 'INR'
    ? 1199
    : parseFloat((1199 * currency.rate).toFixed(2));
  const convertedDiscount = currency.code === 'INR'
    ? 5500
    : parseFloat((5500 * currency.rate).toFixed(2));
  const convertedReferralDiscount = currency.code === 'INR'
    ? referralDiscount
    : parseFloat((referralDiscount * currency.rate).toFixed(2));

  const handlePaymentSuccess = () => {
    if (useFreeCourse && user?.email) {
      claimFreeCourse(user.email);
    }
    if (appliedReferralCode) {
      registerReferral(appliedReferralCode, user?.fullName || user?.email || 'A friend');
    }
    setPaymentDone(true);
  };

  const handleUseFreeCourse = () => {
    setUseFreeCourse(true);
    setCoupon('');
    setAppliedCoupon(false);
    setAppliedReferralCode('');
    setCouponError('');
    setCouponMsg('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(myReferralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── POST-PAYMENT SUCCESS SCREEN ───────────────────────────────────────────
  if (paymentDone) {
    const freeCourses = user?.email ? getAvailableFreeCourses(user.email) : 0;
    const record = referralRecord;
    const nextFreeAt = record ? 3 - (record.referralCount % 3) : 3;

    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-full max-w-lg"
        >
          {/* Enrollment Confirmed */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
            {/* Top Banner */}
            <div className="from-[#7C3AED] to-[#FB6C00] p-6 text-white text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="h-9 w-9 text-white" />
              </div>
              <h1 className="text-2xl font-black">Enrollment Confirmed! 🎉</h1>
              <p className="text-orange-100 text-sm mt-1">
                You're now enrolled in <span className="font-bold text-white">{courseName}</span>
              </p>
            </div>

            {/* Referral Card */}
            <div className="p-6 space-y-5">
              <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-5 text-center">
                <Gift className="h-8 w-8 text-[#7C3AED] mx-auto mb-2" />
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Your Referral Code</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                  Share this code with friends — they get <span className="font-bold text-[#FB6C00]">₹200 off</span> any course!
                </p>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-3">
                  <span className="flex-1 font-black text-xl text-[#7C3AED] tracking-widest text-center">
                    {myReferralCode}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 bg-[#7C3AED] text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#6D28D9] transition cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Referral Progress */}
              <div className="rounded-2xl bg-orange-50 border border-orange-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-[#FB6C00]" />
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-sm">Referral Rewards</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Refer 3 friends → Get 1 FREE course!</p>
                  </div>
                </div>

                {/* Progress dots */}
                <div className="flex items-center justify-between mb-4">
                  {[1, 2, 3].map((n) => {
                    const count = record?.referralCount || 0;
                    const cyclePos = count % 3;
                    const filled = cyclePos >= n;
                    return (
                      <React.Fragment key={n}>
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-black text-sm transition-all ${filled ? 'bg-[#FB6C00] border-[#FB6C00] text-white' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-400'}`}>
                          {filled ? '✓' : n}
                        </div>
                        {n < 3 && <div className={`flex-1 h-1 mx-1 rounded ${filled ? 'bg-[#FB6C00]' : 'bg-slate-200 dark:bg-slate-700'}`} />}
                      </React.Fragment>
                    );
                  })}
                </div>

                <div className="text-center text-xs text-[#7C3AED]">
                  {record?.referralCount || 0} friend{record?.referralCount !== 1 ? 's' : ''} enrolled •{' '}
                  <span className="font-bold text-[#7C3AED]">{nextFreeAt} more to unlock a FREE course</span>
                </div>

                {freeCourses > 0 && (
                  <div className="mt-3 flex items-center justify-center gap-2 bg-[#7C3AED] text-white text-xs font-bold px-4 py-2 rounded-xl">
                    <Star className="h-4 w-4 fill-white" />
                    🎁 You have {freeCourses} free course{freeCourses > 1 ? 's' : ''} available!
                  </div>
                )}
              </div>

              {/* Share via WhatsApp */}
              <button
                onClick={() => {
                  const msg = `Hey! 🚀 I just enrolled on VeeruProAc — India's best tech learning platform! Use my referral code *${myReferralCode}* and get ₹200 off any course. Sign up here: https://veeruproac.learn`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3 rounded-xl transition cursor-pointer"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                Share Code on WhatsApp
              </button>

              <button
                onClick={() => {
                  window.history.pushState({}, '', '/dashboard');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="w-full text-center text-sm font-bold text-[#7C3AED] hover:underline cursor-pointer"
              >
                Go to Dashboard →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── PAYMENT FORM ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-900 dark:text-white pb-12 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header / Nav */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:bg-slate-800 transition shadow-sm cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT COLUMN */}
          <div className="flex-1 space-y-6">

            {/* Main Course Info Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">{courseName}</h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Finish course &amp; Get 100% Refund</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base sm:text-xl font-bold text-slate-400 line-through">{currency.symbol}{convertedOriginal.toLocaleString()}</span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{currency.symbol}{convertedPrice.toLocaleString()}</span>
                  </div>
                  <span className="bg-[#7C3AED] text-white font-bold text-sm px-3 py-1 rounded-full uppercase tracking-wider">
                    42% OFF
                  </span>
                </div>
              </div>
            </div>

            {/* Refund Banner Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-orange-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-[#FB6C00]" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight max-w-[200px]">
                  Get 100% Refund On Course Completion
                </h3>
              </div>
              <span className="text-[#FB6C00] font-bold bg-orange-50 px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                Effectively FREE
              </span>
            </div>

            {/* ── Referral / Coupon Card ── */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Gift className="h-5 w-5 text-[#7C3AED]" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Have a Referral Code?</p>
              </div>
              <p className="text-xs text-slate-400 mb-4">Enter a friend's referral code to get <span className="font-bold text-[#FB6C00]">₹200 off</span> instantly.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="e.g. VPA-XY12Z3"
                  value={coupon}
                  onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponError(''); setCouponMsg(''); }}
                  disabled={appliedCoupon || useFreeCourse}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all disabled:opacity-50 font-mono font-bold tracking-widest"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={!coupon.trim() || appliedCoupon || useFreeCourse}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {appliedCoupon ? '✓ Applied' : 'Apply'}
                </button>
              </div>
              {couponMsg && (
                <p className="text-[#7C3AED] text-sm font-medium mt-3 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> {couponMsg}
                </p>
              )}
              {couponError && (
                <p className="text-[#FB6C00] text-sm font-medium mt-3 flex items-center gap-1">
                  ⚠ {couponError}
                </p>
              )}
            </div>

            {/* Referral Info Banner */}
            <div className="bg-primary border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Earn Free Courses by Referring Friends!</h4>
                  <p className="text-xs text-[#7C3AED] mt-1 leading-relaxed">
                    After enrolling you'll get your own referral code. Each friend who uses it saves <span className="font-bold text-[#FB6C00]">₹200</span>.
                    Refer <span className="font-bold text-[#7C3AED]">3 friends</span> and unlock <span className="font-bold text-[#FB6C00]">1 FREE course</span> for yourself! 🎁
                  </p>
                </div>
              </div>
              {user?.email && getAvailableFreeCourses(user.email) > 0 && (
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-slate-900 dark:text-white font-bold">You have a free course available</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Use one of your earned referrals to enroll for free.</p>
                    </div>
                    <button
                      onClick={handleUseFreeCourse}
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold px-4 py-2 rounded-lg transition"
                    >
                      {useFreeCourse ? 'Free course selected' : 'Use free course'}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:w-[450px]">
            <div className="sticky top-6">

              {/* Limited period banner */}
              <div className="bg-fuchsia-50 text-fuchsia-900 font-semibold text-center py-3 px-4 rounded-t-2xl text-sm border border-fuchsia-100">
                Limited period offer – Enroll before it ends
              </div>

              {/* Summary Card */}
              <div className="bg-white dark:bg-[#1E1E1E] border border-t-0 border-black dark:border-gray-700 rounded-none shadow-md">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-8">
                    <FileText className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Purchase Summary</h2>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-[#7C3AED] font-medium">{courseName}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 line-through text-sm">{currency.symbol}{convertedOriginal.toLocaleString()}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">{currency.symbol}{(currency.code === 'INR' ? 499 : parseFloat((499 * currency.rate).toFixed(2))).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#7C3AED] font-medium">58% Discount</span>
                      <span className="font-bold text-[#FB6C00]">Applied</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between items-center text-[#7C3AED] bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="font-medium flex items-center gap-1.5"><Gift className="h-3.5 w-3.5" /> Referral Discount</span>
                        <span className="font-black">-{currency.symbol}{convertedReferralDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pb-6 border-b border-dashed border-slate-200 dark:border-slate-700">
                      <span className="text-[#7C3AED] font-medium">Placement support</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 line-through text-sm">{currency.symbol}{convertedDiscount.toLocaleString()}</span>
                        <span className="font-bold text-[#7C3AED]">FREE</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-slate-800 dark:text-slate-100">Total Payment</span>
                      <span className="text-2xl font-black text-slate-900 dark:text-white">{currency.symbol}{convertedPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary text-slate-800 dark:text-slate-100 font-semibold text-center py-4 text-sm border-t border-b border-slate-100 dark:border-slate-800">
                  You Save {currency.symbol}{(convertedDiscount + convertedReferralDiscount).toLocaleString()} On This Purchase
                </div>

                <div className="p-6 md:p-8 bg-white dark:bg-[#1E1E1E]">
                  {!useFreeCourse ? (
                    <div className="w-full space-y-3">
                      <button
                        onClick={() => {
                          handlePaymentSuccess();
                        }}
                        className="w-full bg-[#FF9100] hover:bg-orange-600 text-white font-black text-lg py-3.5 rounded-none border border-black transition-colors cursor-pointer uppercase tracking-wider chamfer-btn shadow-md"
                      >
                        Proceed to Pay {currency.symbol}{convertedPrice.toLocaleString()}
                      </button>

                      <div className="pt-2 text-center">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Or Pay via PayPal / International Cards</p>
                        <PayPalButtons
                          style={{ layout: "vertical", color: "gold", shape: "rect", height: 40, tagline: false }}
                          createOrder={(data, actions) => {
                            const usdPrice = parseFloat((finalPrice * 0.012).toFixed(2));
                            return actions.order.create({
                              purchase_units: [{
                                description: courseName,
                                amount: { value: usdPrice.toString(), currency_code: 'USD' }
                              }]
                            });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order.capture().then(() => {
                              handlePaymentSuccess();
                            });
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handlePaymentSuccess}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg py-3.5 rounded-none border border-black transition-colors cursor-pointer uppercase tracking-wider chamfer-btn shadow-md"
                    >
                      Confirm Free Enrollment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-[#7C3AED] opacity-80 border-t border-slate-200 dark:border-slate-700 pt-8">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-[#7C3AED]" />
            <span className="font-bold tracking-tight">100% safe and secure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#7C3AED] p-1 rounded">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[10px] tracking-widest text-[#7C3AED]">SECURE</div>
              <div className="font-bold text-[10px] tracking-wider">SSL ENCRYPTION</div>
            </div>
          </div>
          <div className="flex items-center gap-1 font-bold text-lg tracking-tighter">
            <span className="text-[#0a2540] italic">Razorpay</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;
