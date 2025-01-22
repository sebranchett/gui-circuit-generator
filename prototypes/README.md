# Prototype Options

These files were created to aid discussion around various options for interacting with Jupyter Notebooks.

`failed_iframe_read.ipynb` documents the failed attempts to read from an iframe.

`options.ipynb` documents the various options that were considered.
To run this notebook, you will need to replace `src/gui/gui.html` in the main branch with the one in this folder.

Lines added to the original `gui.html` are as follows:
- 28-29: To add a Save button
- 111-124: To add a download link to download a `.json` representation of the circuit