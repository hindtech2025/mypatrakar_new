// import { useEffect, useState } from "react";
// import { GetPriceDetails } from "../../../../api";

// export const usePackageLoader = (region) => {
//   const [packages, setPackages] = useState([]);
//   const [isLoadingPackages, setIsLoadingPackages] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!region) return;

//     let canceled = false;
//     const loadPackages = async () => {
//       try {
//         setIsLoadingPackages(true);
//         setError(null);
//         const res = await GetPriceDetails();
//         const data = res.data.response.filter(
//           (rgn) => String(rgn?.region) === String(region)
//         );
//         if (!canceled) {
//           setPackages(data);
//         }
//       } catch (err) {
//         if (!canceled) {
//           setError("Failed to load packages. Please try again.");
//           // console.error("Package loading error:", err);
//         }
//       } finally {
//         if (!canceled) {
//           setIsLoadingPackages(false);
//         }
//       }
//     };

//     const debounceTimer = setTimeout(() => {
//       loadPackages();
//     }, 300);

//     return () => {
//       canceled = true;
//       clearTimeout(debounceTimer);
//     };
//   }, [region]);

//   return {
//     packages,
//     isLoadingPackages,
//     error,
//   };
// };


import { useEffect, useState } from "react";
import { GetPriceDetails } from "../../../../api";

export const usePackageLoader = (region, isDemo = 0) => {
  const [packages, setPackages] = useState([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!region && region !== 0) return;

    let canceled = false;

    const loadPackages = async () => {
      try {
        setIsLoadingPackages(true);
        setError(null);

        const response = await GetPriceDetails();

        let packagesData = [];

        // ✅ Handle API response structure safely
        if (response?.data?.response) {
          packagesData = response.data.response;
        } else if (Array.isArray(response?.data)) {
          packagesData = response.data;
        }

        // ✅ Normalize + add is_demo fallback
        packagesData = packagesData.map(pkg => ({
          ...pkg,
          is_demo: Number(pkg.is_demo || 0), // ensure number
        }));

        // ✅ FILTER LOGIC (MAIN FIX 🔥)
        const filteredPackages = packagesData.filter(pkg => {
          const matchRegion = String(pkg.region) === String(region);
          const matchDemo = Number(pkg.is_demo) === Number(isDemo);
          return matchRegion && matchDemo;
        });

        if (!canceled) {
          console.log("Filtered Packages:", filteredPackages);

          setPackages(filteredPackages);

          if (filteredPackages.length === 0) {
            setError(
              `No ${isDemo === 1 ? "demo" : "live"} packages available for selected region`
            );
          }
        }
      } catch (err) {
        if (!canceled) {
          setError("Failed to load packages. Please try again.");
          console.error("Package loading error:", err);
        }
      } finally {
        if (!canceled) {
          setIsLoadingPackages(false);
        }
      }
    };

    // ✅ Debounce (optional but good UX)
    const timer = setTimeout(() => {
      loadPackages();
    }, 300);

    return () => {
      canceled = true;
      clearTimeout(timer);
    };
  }, [region, isDemo]);

  return {
    packages,
    isLoadingPackages,
    error,
  };
};