import {
  BarChart,
  LineChart,
  PieChart,
  Wallet,
  DollarSign,
  TrendingUp,
  Link,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/dashboard/Loader";
import UpdateWalletAddressModal from "../../components/dashboard/home/UpdateWalletAddressModal";
import WithdrawalModal from "../../components/dashboard/home/WithdrawalModal";
import dashboardService from "../../services/dashboardService";
import userService from "../../services/userService";
import TransferModal from "../../components/dashboard/home/TransferSection";
import { allowedTransferId, disbledUserIds } from "../../constants/tokens";

export default function Home() {
  const { user, updateUserDetails } = useAuth();
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [render, setRender] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("roi");
  const [allData, setAllData] = useState({
    totalReturns: 0,
    totalInvestment: 0,
    totalWithdrawal: 0,
    totalEarning: 0,
    totalDeposit: 0,
    totalROI: 0,
    totalRNB: 0,
    latestTransactions: [],
    latestROI: [],
    latestRnB: [],
    latestExtraIncome: [],
    toal_voucher_generated: 0,
    isWithdrawalWalletUpdated:
      JSON.parse(localStorage.getItem("isWithdrawalWalletUpdated")) || false,
    leftBusiness: 0.0,
    rightBusiness: 0.0,
    leftWidth: 0.0,
    rightWidth: 0.0,
    target: 0.0,
    interest_wallet: 0.0,
    binary_career_level: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const updatedUserResponse = await userService.getUserData(user);
        if (updatedUserResponse?.data?.success) {
          updateUserDetails(updatedUserResponse?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsDataLoaded(false);
        const response = await dashboardService.getDashboardData(user);
        const { success, data } = response?.data;
        
        if (success) {
          if (data) {
            let lWidth =
              (parseFloat(data?.left_business) -
                parseFloat(
                  parseFloat(data?.binary_next_level_actual_required) -
                    parseFloat(data?.binary_next_level_business)
                )) /
              parseFloat(data?.binary_next_level_business);
            let rWidth =
              (parseFloat(data?.right_business) -
                parseFloat(
                  parseFloat(data?.binary_next_level_actual_required) -
                    parseFloat(data?.binary_next_level_business)
                )) /
              parseFloat(data?.binary_next_level_business);
            setAllData((prev) => ({
              ...prev,
              totalInvestment: data?.total_investment,
              totalReturns:
                parseFloat(data?.total_earning) -
                parseFloat(data?.total_deposit),
              totalWithdrawal: data?.total_withdrawal,
              totalEarning: data?.total_earning,
              totalDeposit: data?.total_deposit,
              roi_wallet: data?.roi_wallet,
              referral_binary_wallet: data?.referral_binary_wallet,
              interest_wallet: data?.interest_wallet,
              toal_voucher_generated: data?.toal_voucher_generated,
              isWithdrawalWalletUpdated: data?.isWithdrawalWalletUpdated,
              binary_current_level_name: data?.binary_current_level_name,
              binary_next_level_name: data?.binary_next_level_name,
              leftBusiness: parseFloat(data?.left_business || 0)?.toFixed(2),
              rightBusiness: parseFloat(data?.right_business || 0)?.toFixed(2),
              leftWidth: lWidth * 100,
              rightWidth: rWidth * 100,
              target: data?.binary_next_level_business,
              binary_career_level: data?.binary_career_level,
              sponsor_email: data?.sponsor_email,
              sponsor_name: data?.sponsor_name,
            }));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoaded(true);
      }
    })();
  }, [render]);

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    setIsWithdrawalModalOpen(false);
  };

  if (!isDataLoaded) {
    return <Loader />;
  }

  // Format user data for UI
  const userData = {
    userId: user?.user?.userId,
    name: user?.user?.name,
    balance: `$${(
      parseFloat(allData?.roi_wallet || 0) +
      parseFloat(allData?.referral_binary_wallet || 0) +
      parseFloat(allData?.interest_wallet || 0)
    ).toFixed(2)}`,
    sponsorEmail: allData?.sponsor_email || "No sponsor",
    sponsorName: allData?.sponsor_name || "No sponsor",
    currency: "US Dollar",
    status: "Active",
    referralLinks: {
      left: `https://crownbankers.com/signup?sponsorId=${user?.user?.userId}&position=left`,
      right: `https://crownbankers.com/signup?sponsorId=${user?.user?.userId}&position=right`,
    },
    wallets: {
      roi: `$${parseFloat(allData?.roi_wallet || 0).toFixed(2)}`,
      rb: `$${parseFloat(allData?.referral_binary_wallet || 0).toFixed(2)}`,
      extraIncome: `$${parseFloat(allData?.interest_wallet || 0).toFixed(2)}`,
      coupons: `$${parseFloat(allData?.toal_voucher_generated || 0).toFixed(2)}`,
    },
    totals: {
      investment: `$${parseFloat(allData?.totalInvestment || 0).toFixed(2)}`,
      withdrawal: `$${parseFloat(allData?.totalWithdrawal || 0).toFixed(2)}`,
    },
    career: {
      currentLevel: allData?.binary_career_level || 0,
      nextLevel: `${(allData?.binary_career_level || 0) + 1} - ${allData?.binary_next_level_name || "Bronze"}`,
      leftBusiness: { 
        current: `$${parseFloat(allData?.leftBusiness || 0).toFixed(2)}`, 
        target: `$${parseFloat(allData?.target || 0).toFixed(2)}` 
      },
      rightBusiness: { 
        current: `$${parseFloat(allData?.rightBusiness || 0).toFixed(2)}`, 
        target: `$${parseFloat(allData?.target || 0).toFixed(2)}` 
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Your Balance"
          value={userData.balance}
          change="0%"
          period="Current"
          icon={<DollarSign className="text-green-500" />}
        />
        <StatCard
          title="Total Investment"
          value={userData.totals.investment}
          change="0%"
          period="All time"
          icon={<Wallet className="text-green-500" />}
        />
        <StatCard
          title="Total Withdrawal"
          value={userData.totals.withdrawal}
          change="0%"
          period="All time"
          icon={<TrendingUp className="text-green-500" />}
        />
      </div>
      
      {/* Wallets section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold tracking-wide text-gray-800 dark:text-white mb-4">
            Wallet Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ROI Wallet
              </p>
              <p className="text-lg font-semibold">{userData.wallets.roi}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                R&B Wallet
              </p>
              <p className="text-lg font-semibold">{userData.wallets.rb}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Extra Income Wallet
              </p>
              <p className="text-lg font-semibold">
                {userData.wallets.extraIncome}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Voucher
              </p>
              <p className="text-lg font-semibold">
                {userData.wallets.coupons}
              </p>
            </div>
            <div className="col-span-2 flex justify-center items-center mt-4">
              {!disbledUserIds?.includes(user?.user?.userId) && (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-semibold"
                  onClick={() => setIsWithdrawalModalOpen(true)}
                >
                  Withdraw
                </button>
              )}
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md text-lg font-semibold ml-4"
                onClick={() => navigate("/dashboard/investments/all-plans")}
              >
                Reinvest
              </button>
              {allowedTransferId === user?.user?.userId && (
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md text-lg font-semibold ml-4"
                  onClick={() => setIsTransferModalOpen(true)}
                >
                  Transfer
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 tracking-wide dark:text-white mb-4">
            Wallet Settings
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                User ID: {userData.userId}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Name: {userData.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Status: {userData.status}
              </p>
            </div>
            <UpdateWalletAddressModal />
          </div>
        </div>
      </div>

      {/* Referral Links and Career Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
              <Award className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold tracking-wide text-gray-800 dark:text-white">
              Career Progress
            </h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current Level
                </p>
                <p className="text-lg font-semibold">
                  {userData.career.currentLevel}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Next Level
                </p>
                <p className="text-lg font-semibold">
                  {userData.career.nextLevel}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Left Business
                </p>
                <p className="text-lg font-semibold">
                  {userData.career.leftBusiness.current} /{" "}
                  {userData.career.leftBusiness.target}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(allData?.leftWidth || 0, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Right Business
                </p>
                <p className="text-lg font-semibold">
                  {userData.career.rightBusiness.current} /{" "}
                  {userData.career.rightBusiness.target}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(allData?.rightWidth || 0, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Links Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
              <Link className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 tracking-wide dark:text-white">
              Referral Links
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Left Link
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 break-all border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  {userData.referralLinks.left}
                </p>
              </div>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 ml-4 rounded-md text-sm h-10 w-20"
                onClick={() =>
                  navigator.clipboard.writeText(userData.referralLinks.left)
                }
              >
                Copy
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Right Link
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 break-all border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  {userData.referralLinks.right}
                </p>
              </div>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 ml-2 rounded-md text-sm h-10 w-20"
                onClick={() =>
                  navigator.clipboard.writeText(userData.referralLinks.right)
                }
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {isWithdrawalModalOpen && (
        <WithdrawalModal
          isWithdrawalModalOpen={isWithdrawalModalOpen}
          setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
          selectedWallet={selectedWallet}
          allData={allData}
          setRender={setRender}
        />
      )}

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <TransferModal
          isTransferModalOpen={isTransferModalOpen}
          setIsTransferModalOpen={setIsTransferModalOpen}
          setRender={setRender}
        />
      )}
    </div>
  );
}

// Stat Card Component
const StatCard = ({ title, value, change, period, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-700 tracking-wide dark:text-gray-300">
          {title}
        </h3>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {value}
          </div>
          <div className="flex items-center mt-1">
            <span className="text-green-500 text-sm font-medium">{change}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
              {period}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
