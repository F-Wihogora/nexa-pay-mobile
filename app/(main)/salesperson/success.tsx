import { View, Text, ScrollView, SafeAreaView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle, Download, Share, ArrowRight, Calendar, Clock, CreditCard, User, MapPin } from 'lucide-react-native';
import { SalespersonBottomNav } from '../../../components/SalespersonBottomNav';

export default function PaymentSuccess() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const accentBlue = "#3b82f6";

  const transactionData = {
    id: 'TXN-2024-001247',
    date: 'March 11, 2024',
    time: '2:45 PM',
    amount: 219.97,
    tax: 21.99,
    total: 241.96,
    paymentMethod: 'RFID Card',
    cardNumber: '****7048',
    customer: 'Alex Nexa',
    items: [
      { name: 'Summer Collection Dress', price: 89.99, qty: 1 },
      { name: 'Casual Men\'s Shirt', price: 45.99, qty: 1 },
      { name: 'Classic Cotton T-Shirt', price: 29.99, qty: 1 },
      { name: 'Leather Jacket', price: 199.99, qty: 1 }
    ]
  };

  const handleDownloadReceipt = () => {
    // Download receipt logic
  };

  const handleShareReceipt = () => {
    // Share receipt logic
  };

  const handleNewTransaction = () => {
    router.push('/(main)/salesperson/products');
  };

  const handleBackToDashboard = () => {
    router.push('/(main)/salesperson/dashboard');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <View className="bg-white px-6 pt-12 pb-8 items-center">
          <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
            <CheckCircle size={40} color="#10b981" />
          </View>
          <Text style={{ 
            color: primaryNavy,
            fontFamily: 'Poppins_800ExtraBold'
          }} className="text-3xl mb-2">Payment Successful!</Text>
          <Text style={{ 
            color: '#64748b',
            fontFamily: 'Poppins_500Medium'
          }} className="text-base text-center">Your transaction has been completed successfully</Text>
        </View>

        {/* Receipt */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
            {/* Receipt Header */}
            <View className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text style={{ 
                    color: 'white',
                    fontFamily: 'Poppins_800ExtraBold'
                  }} className="text-2xl">NEXA PAY</Text>
                  <Text style={{ 
                    color: 'rgba(255,255,255,0.8)',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-sm">Digital Receipt</Text>
                </View>
                <View className="bg-white/20 p-3 rounded-2xl">
                  <CreditCard size={24} color="white" />
                </View>
              </View>
              
              <View className="bg-white/10 p-4 rounded-2xl">
                <Text style={{ 
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-xs mb-1">Transaction ID</Text>
                <Text style={{ 
                  color: 'white',
                  fontFamily: 'Poppins_700Bold'
                }} className="text-lg">{transactionData.id}</Text>
              </View>
            </View>

            {/* Transaction Details */}
            <View className="p-6">
              <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center">
                  <Calendar size={16} color="#64748b" />
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-sm ml-2">{transactionData.date}</Text>
                </View>
                <View className="flex-row items-center">
                  <Clock size={16} color="#64748b" />
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-sm ml-2">{transactionData.time}</Text>
                </View>
              </View>

              {/* Customer Info */}
              <View className="bg-slate-50 p-4 rounded-2xl mb-6">
                <View className="flex-row items-center mb-2">
                  <User size={16} color={primaryNavy} />
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-sm ml-2">Customer</Text>
                </View>
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-base">{transactionData.customer}</Text>
                <Text style={{ 
                  color: '#94a3b8',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-sm">Card: {transactionData.cardNumber}</Text>
              </View>

              {/* Items List */}
              <View className="mb-6">
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_700Bold'
                }} className="text-lg mb-4">Items Purchased</Text>
                
                {transactionData.items.map((item, index) => (
                  <View key={index} className="flex-row justify-between items-center py-3 border-b border-slate-100">
                    <View className="flex-1">
                      <Text style={{ 
                        color: primaryNavy,
                        fontFamily: 'Poppins_600SemiBold'
                      }} className="text-base">{item.name}</Text>
                      <Text style={{ 
                        color: '#64748b',
                        fontFamily: 'Poppins_500Medium'
                      }} className="text-sm">Qty: {item.qty}</Text>
                    </View>
                    <Text style={{ 
                      color: accentBlue,
                      fontFamily: 'Poppins_700Bold'
                    }} className="text-lg">${item.price}</Text>
                  </View>
                ))}
              </View>

              {/* Payment Summary */}
              <View className="bg-slate-50 p-4 rounded-2xl">
                <View className="flex-row justify-between items-center mb-2">
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-base">Subtotal</Text>
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">${transactionData.amount}</Text>
                </View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-base">Tax (10%)</Text>
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">${transactionData.tax}</Text>
                </View>
                <View className="h-px bg-slate-300 my-3" />
                <View className="flex-row justify-between items-center">
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_800ExtraBold'
                  }} className="text-xl">Total</Text>
                  <Text style={{ 
                    color: accentBlue,
                    fontFamily: 'Poppins_800ExtraBold'
                  }} className="text-2xl">${transactionData.total}</Text>
                </View>
              </View>

              {/* Payment Method */}
              <View className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-200">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                    <CheckCircle size={20} color="#10b981" />
                  </View>
                  <View>
                    <Text style={{ 
                      color: '#059669',
                      fontFamily: 'Poppins_700Bold'
                    }} className="text-base">Paid via {transactionData.paymentMethod}</Text>
                    <Text style={{ 
                      color: '#065f46',
                      fontFamily: 'Poppins_500Medium'
                    }} className="text-sm">Transaction completed successfully</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between mb-4">
            <Pressable 
              onPress={handleDownloadReceipt}
              className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 mr-2 flex-row items-center justify-center"
            >
              <Download size={20} color={primaryNavy} />
              <Text style={{ 
                color: primaryNavy,
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-base ml-2">Download</Text>
            </Pressable>
            
            <Pressable 
              onPress={handleShareReceipt}
              className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 ml-2 flex-row items-center justify-center"
            >
              <Share size={20} color={primaryNavy} />
              <Text style={{ 
                color: primaryNavy,
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-base ml-2">Share</Text>
            </Pressable>
          </View>

          <Pressable 
            onPress={handleNewTransaction}
            style={{ backgroundColor: accentBlue }}
            className="h-16 rounded-2xl flex-row items-center justify-center mb-3 shadow-lg"
          >
            <Text style={{ 
              color: 'white',
              fontFamily: 'Poppins_700Bold'
            }} className="text-lg mr-2">New Transaction</Text>
            <ArrowRight size={20} color="white" />
          </Pressable>

          <Pressable 
            onPress={handleBackToDashboard}
            className="h-14 bg-slate-100 rounded-2xl items-center justify-center"
          >
            <Text style={{ 
              color: primaryNavy,
              fontFamily: 'Poppins_600SemiBold'
            }} className="text-base">Back to Dashboard</Text>
          </Pressable>
        </View>

        <View className="h-32" />
      </ScrollView>

      <SalespersonBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}