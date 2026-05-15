import kutumb from "../../assets/reporters/kutumb.png";
import astv from "../../assets/reporters/astv.png";
import indiaupdesh from "../../assets/reporters/indiaupdesh.png";
import publicbharat from "../../assets/reporters/publicbharat.png";
import { useTranslation } from "react-i18next";
// import "../../../i18n";
export default function OurReporters() {
  const { t } = useTranslation();
  // const [reporters, setReporters] = useState([]);
  // // Uncomment below for API call
  // const showReporter = async () => {
  //   try {
  //     const response = await GetRepoters();
  //     setReporters(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   showReporter();
  // }, []);

  const reporter = [
    {
      reporterLOgo: kutumb,
      reporterName: "Kutumb Jagran News",
    },
    {
      reporterLOgo: astv,
      reporterName: "ASTV 24",
    },
    {
      reporterLOgo: indiaupdesh,
      reporterName: "India Updesh",
    },
    {
      reporterLOgo: publicbharat,
      reporterName: "Public Bharat",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mx-auto px-4 py-8 w-full max-w-screen-xl">
      {/* Title */}
      <section className="text-center mb-8 w-full">
        <h1 className="font-bold font-sans text-2xl sm:text-3xl lg:text-4xl">
          {t("reportersSec")}
        </h1>
      </section>

      {/* Reporters Grid */}
      <section className="w-full ml-0 lg:ml-60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center">
        {reporter.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.reporterLOgo}
              alt={item.reporterName}
              className="w-40 h-40 sm:w-28 sm:h-28 lg:w-24 lg:h-24 object-cover rounded-xl hover:scale-105 transition-transform duration-200  "
              loading="lazy"
            />
            {/* <p className="text-gray-800 font-medium text-sm mt-2 text-center">
              {item.reporterName}
            </p> */}
          </div>
        ))}
      </section>
    </div>
  );
}
