const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // ใส่ experimentalStudio เป็นค่าคอนฟิก
  experimentalStudio: true,
});
