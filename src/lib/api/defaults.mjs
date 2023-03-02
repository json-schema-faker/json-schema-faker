const defaults = {};

export default defaults;

defaults.defaultInvalidTypeProduct = undefined;
defaults.defaultRandExpMax = 10;

defaults.pruneProperties = [];
defaults.ignoreProperties = [];
defaults.ignoreMissingRefs = false;
defaults.failOnInvalidTypes = true;
defaults.failOnInvalidFormat = true;

defaults.alwaysFakeOptionals = false;
defaults.optionalsProbability = null;
defaults.fixedProbabilities = false;
defaults.useExamplesValue = false;
defaults.useDefaultValue = false;
defaults.requiredOnly = false;
defaults.omitNulls = false;

defaults.minItems = 0;
defaults.maxItems = null;
defaults.minLength = 0;
defaults.maxLength = null;

defaults.resolveJsonPath = false;
defaults.reuseProperties = false;
defaults.fillProperties = true;
defaults.sortProperties = false;
defaults.replaceEmptyByRandomValue = false;

defaults.random = Math.random;
defaults.minDateTime = new Date('1889-12-31T00:00:00.000Z');
defaults.maxDateTime = new Date('1970-01-01T00:00:01.000Z');

defaults.renderTitle = true;
defaults.renderDescription = true;
defaults.renderComment = false;
