import "../../styles/index.scss";
import "../../styles/pages/index.scss";
import Column from "../components/column.js";
import Images from "../components/images.js";

// main code to use
/**
 * Main Index class to handle columns, grid and responsive behavior
 */
export default class Index {
  /**
   * Initialize the Index
   */
  constructor() {
    this.columns = [];

    // Initialize components
    this.initGrid();

    // Set up resize handler
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    // Initialize columns after resize values are set
    this.initColumns();
  }

  /**
   * Initialize columns based on screen size
   */
  initColumns() {
    // Select appropriate columns based on screen width
    const isMobile = window.innerWidth <= 1024;
    const columnSelector = isMobile ? ".column:not(:last-child)" : ".column";
    const $columns = document.querySelectorAll(columnSelector);

    // Create Column instances
    this.columns = Array.from($columns).map((item, index) => {
      return new Column({
        el: item,
        reverse: index % 2 !== 0,
      });
    });

    // Initialize hero images for desktop only
    if (!isMobile) {
      const heroImagesEl = document.querySelector("#hero-images");
      if (heroImagesEl) {
        new Images({ el: heroImagesEl });
      }
    }
  }

  /**
   * Initialize debug grid with keyboard shortcut
   */
  initGrid() {
    document.addEventListener("keydown", (event) => {
      if (event.shiftKey && event.key === "G") {
        const gridEl = document.getElementById("grid");
        if (gridEl) {
          gridEl.classList.toggle("show");
        }
      }
    });
  }

  /**
   * Handle window resize events
   */
  resize() {
    // Update responsive viewport width CSS variable
    const viewportWidth = document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--rvw",
      `${viewportWidth / 100}px`
    );

    // Handle column cleanup on mobile
    if (window.innerWidth <= 1024) {
      if (this.columns[1]) {
        this.columns[1].destroy();
        this.columns[1] = null;
      }
    }
  }
}

window.addEventListener("load", () => {
  new Index();
  document.body.classList.remove("loading");
});

// extra anmaton
/**
 * Main Index class to handle columns, grid and responsive behavior
 */
// export default class Index {
//   /**
//    * Initialize the Index
//    * @param {Object} options - Configuration options
//    * @param {boolean} options.animations - Enable/disable animations (default: true)
//    * @param {number} options.animationSpeed - Animation speed multiplier (default: 1)
//    */
//   constructor(options = {}) {
//     // Default configuration
//     this.config = {
//       animations: options.animations !== undefined ? options.animations : true,
//       animationSpeed: options.animationSpeed || 1,
//       mobileBreakpoint: 1024,
//     };

//     this.columns = [];
//     this.isInitialized = false;

//     // Initialize components
//     this.initGrid();
//     this.initAnimationControls();

//     // Set up resize handler with debounce
//     this.resizeTimeout = null;
//     window.addEventListener("resize", this.handleResize.bind(this));
//     this.resize();

//     // Initialize columns after resize values are set
//     this.initColumns();

//     // Mark as initialized
//     this.isInitialized = true;
//   }

//   /**
//    * Initialize columns based on screen size
//    */
//   initColumns() {
//     // Clean up existing columns if reinitializing
//     if (this.isInitialized && this.columns.length) {
//       this.columns.forEach((column) => {
//         if (column && typeof column.destroy === "function") {
//           column.destroy();
//         }
//       });
//       this.columns = [];
//     }

//     // Select appropriate columns based on screen width
//     const isMobile = this.isMobile();
//     const columnSelector = isMobile ? ".column:not(:last-child)" : ".column";
//     const $columns = document.querySelectorAll(columnSelector);

//     // Create Column instances
//     this.columns = Array.from($columns).map((item, index) => {
//       return new Column({
//         el: item,
//         reverse: index % 2 !== 0,
//         animated: this.config.animations,
//         speed: this.config.animationSpeed,
//       });
//     });

//     // Initialize hero images for desktop only
//     if (!isMobile) {
//       const heroImagesEl = document.querySelector("#hero-images");
//       if (heroImagesEl) {
//         new Images({
//           el: heroImagesEl,
//           animated: this.config.animations,
//           speed: this.config.animationSpeed,
//         });
//       }
//     }

//     // Apply animation state to all elements with animation classes
//     this.updateAnimationState();
//   }

//   /**
//    * Initialize debug grid with keyboard shortcut
//    */
//   initGrid() {
//     document.addEventListener("keydown", (event) => {
//       if (event.shiftKey && event.key === "G") {
//         const gridEl = document.getElementById("grid");
//         if (gridEl) {
//           gridEl.classList.toggle("show");
//         }
//       }
//     });
//   }

//   /**
//    * Initialize animation controls with keyboard shortcuts
//    */
//   initAnimationControls() {
//     // Create UI controls for animations
//     this.createAnimationControls();

//     // Keyboard shortcuts for animation controls
//     document.addEventListener("keydown", (event) => {
//       // Shift + A to toggle animations
//       if (event.shiftKey && event.key === "A") {
//         this.toggleAnimations();
//       }

//       // Shift + S to slow down animations
//       if (event.shiftKey && event.key === "S") {
//         this.adjustAnimationSpeed(0.5);
//       }

//       // Shift + F to speed up animations
//       if (event.shiftKey && event.key === "F") {
//         this.adjustAnimationSpeed(2);
//       }

//       // Shift + R to reset animation speed
//       if (event.shiftKey && event.key === "R") {
//         this.resetAnimations();
//       }
//     });
//   }

//   /**
//    * Create animation control UI
//    */
//   createAnimationControls() {
//     // Create the controls container
//     const controls = document.createElement("div");
//     controls.className = "animation-controls";
//     controls.style.position = "fixed";
//     controls.style.bottom = "20px";
//     controls.style.right = "20px";
//     controls.style.zIndex = "1000";
//     controls.style.background = "rgba(0,0,0,0.7)";
//     controls.style.padding = "10px";
//     controls.style.borderRadius = "5px";
//     controls.style.color = "white";
//     controls.style.fontSize = "12px";

//     // Add toggle button
//     const toggleBtn = document.createElement("button");
//     toggleBtn.textContent = "Toggle Animations";
//     toggleBtn.style.marginRight = "5px";
//     toggleBtn.style.padding = "5px 10px";
//     toggleBtn.addEventListener("click", () => this.toggleAnimations());

//     // Add speed controls
//     const speedDown = document.createElement("button");
//     speedDown.textContent = "Slower";
//     speedDown.style.marginRight = "5px";
//     speedDown.style.padding = "5px 10px";
//     speedDown.addEventListener("click", () => this.adjustAnimationSpeed(0.5));

//     const speedUp = document.createElement("button");
//     speedUp.textContent = "Faster";
//     speedUp.style.marginRight = "5px";
//     speedUp.style.padding = "5px 10px";
//     speedUp.addEventListener("click", () => this.adjustAnimationSpeed(2));

//     const resetSpeed = document.createElement("button");
//     resetSpeed.textContent = "Reset";
//     resetSpeed.style.padding = "5px 10px";
//     resetSpeed.addEventListener("click", () => this.resetAnimations());

//     // Add info about keyboard shortcuts
//     const info = document.createElement("div");
//     info.style.marginTop = "10px";
//     info.style.fontSize = "10px";
//     info.innerHTML =
//       "Shortcuts: Shift+A (toggle), Shift+S (slower), Shift+F (faster), Shift+R (reset)";

//     // Append all elements
//     controls.appendChild(toggleBtn);
//     controls.appendChild(speedDown);
//     controls.appendChild(speedUp);
//     controls.appendChild(resetSpeed);
//     controls.appendChild(info);

//     // Add to document
//     document.body.appendChild(controls);
//   }

//   /**
//    * Toggle animations on/off
//    */
//   toggleAnimations() {
//     this.config.animations = !this.config.animations;
//     this.updateAnimationState();

//     // Show feedback toast
//     this.showToast(
//       `Animations ${this.config.animations ? "enabled" : "disabled"}`
//     );
//   }

//   /**
//    * Adjust animation speed
//    * @param {number} multiplier - Speed multiplier
//    */
//   adjustAnimationSpeed(multiplier) {
//     this.config.animationSpeed *= multiplier;

//     // Update animation speed CSS variable
//     document.documentElement.style.setProperty(
//       "--animation-speed",
//       `${this.config.animationSpeed}`
//     );

//     // Show feedback toast
//     this.showToast(
//       `Animation speed: ${this.config.animationSpeed.toFixed(2)}x`
//     );
//   }

//   /**
//    * Reset animation settings
//    */
//   resetAnimations() {
//     this.config.animations = true;
//     this.config.animationSpeed = 1;
//     this.updateAnimationState();
//     document.documentElement.style.setProperty("--animation-speed", "1");

//     // Show feedback toast
//     this.showToast("Animations reset to default");
//   }

//   /**
//    * Update animation state for all elements
//    */
//   updateAnimationState() {
//     // Apply animation state to all animated elements
//     document.documentElement.classList.toggle(
//       "animations-disabled",
//       !this.config.animations
//     );

//     // Update animation speed CSS variable
//     document.documentElement.style.setProperty(
//       "--animation-speed",
//       `${this.config.animationSpeed}`
//     );

//     // Update columns if they exist
//     this.columns.forEach((column) => {
//       if (column && typeof column.updateAnimationState === "function") {
//         column.updateAnimationState(
//           this.config.animations,
//           this.config.animationSpeed
//         );
//       }
//     });
//   }

//   /**
//    * Show a temporary toast message
//    * @param {string} message - Message to display
//    */
//   showToast(message) {
//     // Remove existing toast if present
//     const existingToast = document.querySelector(".index-toast");
//     if (existingToast) {
//       document.body.removeChild(existingToast);
//     }

//     // Create toast element
//     const toast = document.createElement("div");
//     toast.className = "index-toast";
//     toast.textContent = message;
//     toast.style.position = "fixed";
//     toast.style.top = "20px";
//     toast.style.left = "50%";
//     toast.style.transform = "translateX(-50%)";
//     toast.style.background = "rgba(0,0,0,0.8)";
//     toast.style.color = "white";
//     toast.style.padding = "10px 20px";
//     toast.style.borderRadius = "5px";
//     toast.style.zIndex = "2000";

//     // Add to document
//     document.body.appendChild(toast);

//     // Remove after delay
//     setTimeout(() => {
//       if (document.body.contains(toast)) {
//         document.body.removeChild(toast);
//       }
//     }, 2000);
//   }

//   /**
//    * Handle window resize with debounce
//    */
//   handleResize() {
//     // Clear existing timeout
//     if (this.resizeTimeout) {
//       clearTimeout(this.resizeTimeout);
//     }

//     // Set new timeout to avoid excessive updates
//     this.resizeTimeout = setTimeout(() => {
//       this.resize();
//     }, 200);
//   }

//   /**
//    * Check if viewport is mobile size
//    * @returns {boolean} True if viewport is mobile size
//    */
//   isMobile() {
//     return window.innerWidth <= this.config.mobileBreakpoint;
//   }

//   /**
//    * Handle window resize events
//    */
//   resize() {
//     // Update responsive viewport width CSS variable
//     const viewportWidth = document.documentElement.clientWidth;
//     document.documentElement.style.setProperty(
//       "--rvw",
//       `${viewportWidth / 100}px`
//     );

//     // Handle column cleanup on mobile
//     const wasMobile = this.columns[1] === null;
//     const isMobile = this.isMobile();

//     // Reinitialize columns if screen size category changed
//     if (isMobile !== wasMobile) {
//       this.initColumns();
//     } else if (isMobile && this.columns[1]) {
//       this.columns[1].destroy();
//       this.columns[1] = null;
//     }
//   }
// }

// /**
//  * Initialize the page when loaded
//  */
// window.addEventListener("load", () => {
//   // Initialize with default options
//   window.indexInstance = new Index({
//     animations: true,
//     animationSpeed: 1,
//   });

//   document.body.classList.remove("loading");
// });
