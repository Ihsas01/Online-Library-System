import { motion } from 'framer-motion';

const LoadingSkeleton = ({ 
  type = "card", 
  className = "",
  lines = 3,
  height = "h-4"
}) => {
  const shimmerVariants = {
    animate: {
      x: ["-100%", "100%"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  variants={shimmerVariants}
                  animate="animate"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    variants={shimmerVariants}
                    animate="animate"
                  />
                </div>
                <div className="h-3 bg-gray-200 rounded w-3/4 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    variants={shimmerVariants}
                    animate="animate"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {[...Array(lines)].map((_, i) => (
                <div key={i} className={`${height} bg-gray-200 rounded relative overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    variants={shimmerVariants}
                    animate="animate"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "text":
        return (
          <div className={`space-y-2 ${className}`}>
            {[...Array(lines)].map((_, i) => (
              <div key={i} className={`${height} bg-gray-200 rounded relative overflow-hidden`}>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  variants={shimmerVariants}
                  animate="animate"
                />
              </div>
            ))}
          </div>
        );

      case "avatar":
        return (
          <div className={`w-12 h-12 bg-gray-200 rounded-full relative overflow-hidden ${className}`}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
        );

      case "button":
        return (
          <div className={`h-10 bg-gray-200 rounded-lg relative overflow-hidden ${className}`}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
        );

      default:
        return (
          <div className={`${height} bg-gray-200 rounded relative overflow-hidden ${className}`}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
        );
    }
  };

  return renderSkeleton();
};

export default LoadingSkeleton; 