import headerEventHub from './lib/header_event_hub.ts';
import sketchEventHub from './lib/sketch_event_hub.ts';
import contentEventHub from './lib/content_event_hub.ts';
import logoxSchema from './schema/logox.ts';
import './assets/less/index.less';

headerEventHub.initClickEvent();
contentEventHub.initClickEvent();

sketchEventHub.triggerRender(logoxSchema);

console.log('hello logox-portal');