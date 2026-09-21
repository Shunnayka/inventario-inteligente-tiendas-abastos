// Config de Metro para monorepo (npm workspaces), siguiendo la guía oficial de Expo:
// https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Deja que Metro vea los cambios en el paquete compartido.
config.watchFolders = [monorepoRoot];

// Resuelve node_modules tanto locales como del root del workspace.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Evita que Metro resuelva un React/React Native distinto al del proyecto
// cuando encuentra otra copia instalada en el root del monorepo.
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
