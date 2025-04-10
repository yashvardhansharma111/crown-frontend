import { useEffect, useState } from "react";
import {
  BIReport,
  ROIReport,
  RIReport,
  ExtraIncomeReport,
  WithdrawalReport,
} from "../../components";
import reportService from "../../services/reportService";
import { useAuth } from "../../hooks/useAuth";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaArrowUp,
} from "react-icons/fa";
import { CgArrowsExchange } from "react-icons/cg";
import { BiFilterAlt } from "react-icons/bi";

export default function Reports() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("roi");
  const [filterDays, setFilterDays] = useState(30);

  const [allData, setAllData] = useState({
    allROIData: [],
    allBIData: [],
    allRIData: [],
    allExtraIncomeData: [],
    allWithdrawalData: [],
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    (async () => {
      try {
        const [
          roiResponse,
          biResponse,
          riResponse,
          extraIncomeResponse,
          withdrawalResponse,
        ] = await Promise.all([
          reportService.getROIReport(user),
          reportService.getBIReport(user),
          reportService.getRIReport(user),
          reportService.getExtraIncomeReport(user),
          reportService.getWithdrawalReport(user),
        ]);

        if (roiResponse?.data?.success)
          handleDataChange("allROIData", roiResponse.data.data);
        if (biResponse?.data?.success)
          handleDataChange("allBIData", biResponse.data.data);
        if (riResponse?.data?.success)
          handleDataChange("allRIData", riResponse.data.data);
        if (extraIncomeResponse?.data?.success)
          handleDataChange("allExtraIncomeData", extraIncomeResponse.data.data);
        if (withdrawalResponse?.data?.success)
          handleDataChange("allWithdrawalData", withdrawalResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "roi":
        return <ROIReport data={allData.allROIData} />;
      case "bi":
        return <BIReport data={allData.allBIData} />;
      case "ri":
        return <RIReport data={allData.allRIData} />;
      case "extra":
        return <ExtraIncomeReport data={allData.allExtraIncomeData} />;
      case "withdrawal":
        return <WithdrawalReport data={allData.allWithdrawalData} />;
      default:
        return <ROIReport data={allData.allROIData} />;
    }
  };

  const tabItems = [
    { key: "roi", label: "ROI Report", icon: <FaChartLine /> },
    { key: "bi", label: "BI Report", icon: <FaMoneyBillWave /> },
    { key: "ri", label: "RI Report", icon: <CgArrowsExchange /> },
    { key: "extra", label: "Extra Income", icon: <FaHandHoldingUsd /> },
    { key: "withdrawal", label: "Withdrawal", icon: <FaArrowUp /> },
  ];

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">Let's check your update today</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-[#1E293B] rounded-t-lg overflow-x-auto shadow-sm">
        <div className="flex flex-wrap">
          {tabItems.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-4 flex items-center whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "border-b-2 border-green-500 text-green-500 dark:text-green-400 dark:border-green-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab header & filters */}
      <div className="bg-white dark:bg-[#1E293B] px-4 py-4 border-t border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h2 className="text-xl text-gray-900 dark:text-white font-medium">
            {{
              roi: "Return on Investment Report",
              bi: "Binary Income Report",
              ri: "Referral Income Report",
              extra: "Extra Income Report",
              withdrawal: "Withdrawal Report",
            }[activeTab]}
          </h2>

          <div className="flex items-center gap-2">
            <button className="bg-gray-100 dark:bg-[#2D3748] text-gray-700 dark:text-white px-3 py-2 rounded-md flex items-center text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <BiFilterAlt className="mr-2" />
              All Reports
            </button>
            <button
              onClick={() => setFilterDays(30)}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                filterDays === 30
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-100 dark:bg-[#2D3748] text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white dark:bg-[#1E293B] rounded-b-lg overflow-hidden p-4 shadow-sm">
        {renderTabContent()}
      </div>
    </div>
  );
}
