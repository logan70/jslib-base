module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc','closure']
  },
  source: {
    include: ['./src', 'README.md'],
    includePattern: '.+\\.js(doc)?$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  plugins: [],
  templates: {
    default: {
      includeDate: false
    },
    cleverLinks: false,
    monospaceLinks: false
  },
  opts: {
    template: 'node_modules/docdash',
    encoding: 'utf8',
    destination: 'docs/',
    recurse: true
  },
  docdash: {
    static: true,
    sort: true,
    sectionOrder: [
      'Namespaces',
      'Classes',
      'Modules',
      'Externals',
      'Events',
      'Mixins',
      'Tutorials',
      'Interfaces'
    ],
    search: true,
    collapse: true,
    wrap: true,
    typedefs: true,
    navLevel: 1
  }
}