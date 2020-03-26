// Base.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class PluginBase {
  constructor() {
    // Mandatory parameters
    this.name = 'pluginBase';
    this.desc = 'A plugin description';
    this.longDescription = 'Description to show in the settings';
    this.enabled = true; //Whether the plugin is enabled
    this.shortcut = ''; // Assign a shortcut key
    this.icon = ''; // Icon to put on the toolbar

    // Toolbar button
    this.$el = null;

    // Extra content for settings
    this.extraContentId = null;
  }

  /**
   * Action to run when clicking on the toolbar button
   */
  callback() {
    this.toggle();
  }

  /**
   * Action to run upon initialization
   */
  init() {
    // Next Theme
    const $toolbarBtn = document.createElement('button');
    this.$el = $toolbarBtn;

    $toolbarBtn.className =
      'c-button-unstyled p-classic_nav__right__button p-classic_nav__right__button--sidebar p-classic_nav__right__sidebar p-classic_nav__no_drag';
    this.addIcon($toolbarBtn);
    $toolbarBtn.addEventListener('click', () => this.onToolbarClick());
    // Add tooltip
    window.slackPluginsAPI.addTooltip(this);

    let $header = document.querySelector('.p-classic_nav__right_header');
    let $newHeader = document.querySelector('.p-top_nav__right');
    if ($header) {
      // Add buttons
      $header.appendChild($toolbarBtn);
    }
    if ($newHeader) {
      // Add buttons
      $newHeader.appendChild($toolbarBtn);
    }

    // Show or hide the toolbar button according to settings
    this.toggleDisplay($toolbarBtn);

    // Apply preferences
    this.apply();
  }

  /**
   * What to do on toolbar click
   * @abstract
   */
  onToolbarClick() {
    // to be implemented
  }

  /**
   * Toggle this plugin
   */
  toggle() {
    this.toggleDisplay(this.$el);
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Show or hide the toolbar button
   * @param button
   */
  toggleDisplay() {
    if (this.enabled) {
      this.$el.style.display = 'flex';
    }
    else {
      this.$el.style.display = 'none';
    }
  }

  /**
   * Load settings for this plugin
   * @param settings
   */
  loadSettings(settings = {}) {
    Object.assign(this, settings);
  }

  /**
   * Return settings to save
   * @abstract
   */
  saveSettings() {
    throw Error('To be implemented');
  }

  /**
   * Change the enabled state
   * @param enabled
   */
  switch(enabled) {
    this.enabled = enabled;
    this.toggle();
  }

  /**
   * Add icon to the toolbar button
   * @param button
   */
  addIcon() {
    this.$el.innerHTML = `<i class="c-icon c-icon--${this.icon}" type="magic" aria-hidden="true"></i>`;
  }

  /**
   * Apply the plugin
   * @abstract
   */
  apply() {
    throw Error('to be implemented');
  }

  /**
   * Return the html code for the extra content
   */
  extraContent() {
    return '';
  }

  /**
   * Action executed on clicking apply
   */
  extraContentOnClick() {
// to be implemented
  }
}

window.slackPluginsAPI.pluginBase = PluginBase;
