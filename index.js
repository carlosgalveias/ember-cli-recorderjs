/* eslint-env node */
'use strict';

module.exports = {
    name: 'ember-cli-recorderjs',

    options: {
		'ember-cli-babel': {
			compileModules: true,
			includePolyfill: true,
			disableDebugTooling: true
		}
    },

    included() {
        this._super.included.apply(this, arguments);
        this._ensureThisImport();

        this.import('vendor/recorder.js');
        this.import('vendor/shims/recorder.js');
    },

    _ensureThisImport() {
        if (!this.import) {
            this._findHost = function findHostShim() {
                let current = this;
                let app;

                do {
                    app = current.app || app;
                } while (current.parent.parent && (current = current.parent));
                return app;
            };
            this.import = function importShim(asset, options) {
                let app = this._findHost();
                app.import(asset, options);
            };
        }
    }
};