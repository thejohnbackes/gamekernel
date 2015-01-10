import Component = require('./core/component');
import Table = require('./core/table');
import Database = require('./core/database');
import Kernel = require('./core/kernel');
import System = require('./core/system');
import BehaviorSystem = require('./plugin/behavior-system');
import Behavior = require('./plugin/behavior');
import util = require('./core/util');
import Runner = require('./core/runner');
import Engine = require('./core/engine');
import State = require('./state/state');
import StateMachine = require('./state/state-machine');
import events = require('./core/events');
declare var out: {
    Component: typeof Component;
    Table: typeof Table;
    Database: typeof Database;
    System: typeof System;
    Kernel: typeof Kernel;
    BehaviorSystem: typeof BehaviorSystem;
    Behavior: typeof Behavior;
    extend: typeof util.extend;
    Runner: typeof Runner;
    Engine: typeof Engine;
    StateMachine: typeof StateMachine;
    State: typeof State;
    Emitter: typeof events.Emitter;
};
export = out;