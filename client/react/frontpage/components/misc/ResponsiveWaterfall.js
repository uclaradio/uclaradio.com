// ResponsiveWaterfall.js
// Provides 'pinterest'-style layout of boxes with varying heights

const Waterfall = function(opts) {
  // define property
  let minBoxWidth;
  Object.defineProperty(this, 'minBoxWidth', {
    get() {
      return minBoxWidth;
    },
    set(value) {
      if (value < 100) value = 100;
      if (value > 1000) value = 1000;

      minBoxWidth = value;
    },
  });

  opts = opts || {};
  const containerSelector = opts.containerSelector || '.wf-container';
  const boxSelector = opts.boxSelector || '.wf-box';

  // init properties
  this.minBoxWidth = opts.minBoxWidth || 250;
  this.columns = [];
  this.container = document.querySelector(containerSelector);
  this.boxes = this.container
    ? Array.prototype.slice.call(this.container.querySelectorAll(boxSelector))
    : [];

  // compose once in constructor
  this.compose();

  // handle the image or something which might change size after loaded
  let images = this.container.querySelectorAll('img'),
    that = this;
  let clr;
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    img.onload = function() {
      if (clr) clearTimeout(clr);

      clr = setTimeout(() => {
        that.compose(true);
      }, 500);
    };
  }

  window.addEventListener('resize', () => {
    that.compose();
  });
};

// compute the number of columns under current setting
Waterfall.prototype.computeNumberOfColumns = function() {
  let num = Math.floor(this.container.clientWidth / this.minBoxWidth);
  num = num || 1; // at least one column
  return num;
};

// init enough columns and set the width
Waterfall.prototype.initColumns = function(num) {
  if (num > 0) {
    // create column div
    this.columns = [];
    const width = `${100 / num}%`;
    while (num--) {
      const column = document.createElement('div');
      column.className = 'wf-column';
      column.style.width = width;
      this.columns.push(column);
      this.container.appendChild(column);
    }
  }
};

// get the index of shortest column
Waterfall.prototype.getMinHeightIndex = function() {
  if (this.columns && this.columns.length > 0) {
    let min = this.columns[0].clientHeight,
      index = 0;
    for (let i = 1; i < this.columns.length; i++) {
      const columnElem = this.columns[i];
      if (columnElem.clientHeight < min) {
        min = columnElem.clientHeight;
        index = i;
      }
    }
    return index;
  }
  return -1;
};

// get the index of highset column
Waterfall.prototype.getHighestIndex = function() {
  if (this.columns && this.columns.length > 0) {
    let max = this.columns[0].clientHeight,
      index = 0;
    for (let i = 1; i < this.columns.length; i++) {
      const columnElem = this.columns[i];
      if (columnElem.clientHeight > max) {
        max = columnElem.clientHeight;
        index = i;
      }
    }
    return index;
  }
  return -1;
};

// compose core
Waterfall.prototype.compose = function(force) {
  const num = this.computeNumberOfColumns();
  const cols = this.columns.length;

  if (force || num != cols) {
    // remove old column
    for (var i = 0; i < this.columns.length; i++) {
      const columnElem = this.columns[i];
      columnElem.remove();
    }

    // init new column
    this.initColumns(num);

    // compose
    for (var i = 0, l = this.boxes.length; i < l; i++) {
      const box = this.boxes[i];
      this.addBox(box);
    }
  }
};

// add a new box to grid
Waterfall.prototype.addBox = function(elem) {
  // push if new box
  if (this.boxes.indexOf(elem) < 0) {
    this.boxes.push(elem);
  }

  const columnIndex = this.getMinHeightIndex();
  if (columnIndex > -1) {
    const column = this.columns[columnIndex];
    $(column).append(elem);
  }
};

module.exports = Waterfall;
