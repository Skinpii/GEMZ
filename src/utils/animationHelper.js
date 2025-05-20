/**
 * Animation helper utility functions
 */

/**
 * Creates a delay using Promise to be used with async/await
 * @param {number} ms - Time to delay in milliseconds
 * @returns {Promise} - Promise that resolves after the specified time
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Applies staggered animation to a group of elements
 * @param {Array<HTMLElement>} elements - Array of DOM elements to animate
 * @param {string} className - CSS class name to add for animation
 * @param {number} staggerDelay - Delay between each element animation in ms
 * @param {boolean} remove - If true, removes the class instead of adding
 * @returns {Promise} - Promise that resolves when all animations are applied
 */
export const animateElements = async (elements, className, staggerDelay = 100, remove = false) => {
  if (!elements || elements.length === 0) return Promise.resolve();
  
  const promises = [];
  
  for (let i = 0; i < elements.length; i++) {
    const promise = delay(i * staggerDelay).then(() => {
      if (remove) {
        elements[i].classList.remove(className);
      } else {
        elements[i].classList.add(className);
      }
    });
    
    promises.push(promise);
  }
  
  return Promise.all(promises);
};

/**
 * Check if the device is a mobile device
 * @returns {boolean} - True if the device is mobile
 */
export const isMobileDevice = () => {
  return window.innerWidth <= 768;
};