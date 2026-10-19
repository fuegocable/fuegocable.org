import {Plugin, PluginContext} from '@docusaurus/types';
import fs from 'fs';
import path from 'path';

interface PluginOptions {
  directories: string[];
}

export default function dynamicFileListPlugin(
  context: PluginContext,
  options: PluginOptions,
): Plugin {
  return {
    name: 'dynamic-file-list-plugin',
    
    async loadContent() {
      const result: Record<string, string[]> = {};

      for (const dir of options.directories) {
        const staticDir = path.join(context.siteDir, 'static', dir);
        
        if (!fs.existsSync(staticDir)) {
          result[dir] = [];
          continue;
        }

        const files = fs.readdirSync(staticDir);
        
        result[dir] = files
          .filter(file => !file.startsWith('.'))
          .sort((a, b) => a.localeCompare(b));
      }

      return result;
    },

    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData({
        staticDirectories: content,
      });
    },
  };
}
