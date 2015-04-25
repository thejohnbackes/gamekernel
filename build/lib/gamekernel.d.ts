// Generated by dts-bundle v0.2.0

declare module 'gamekernel' {
    export import Component = require('__gamekernel/core/component');
    export import Table = require('__gamekernel/core/table');
    export import Database = require('__gamekernel/core/database');
    export import Kernel = require('__gamekernel/core/kernel');
    export import System = require('__gamekernel/core/system');
    export import BehaviorSystem = require('__gamekernel/plugin/behavior-system');
    export import Behavior = require('__gamekernel/plugin/behavior');
    export import util = require('__gamekernel/core/util');
    export import extend = util.extend;
    export import Runner = require('__gamekernel/core/runner');
    export import Engine = require('__gamekernel/core/engine');
    export import State = require('__gamekernel/state/state');
    export import StateMachine = require('__gamekernel/state/state-machine');
    export import welder = require('__gamekernel/core/welder');
    import events = require('__gamekernel/core/events');
    export import Emitter = events.Emitter;
}

declare module '__gamekernel/core/component' {
    import Entity = require('__gamekernel/core/entity');
    class Component {
        entity: Entity;
    }
    export = Component;
}

declare module '__gamekernel/core/table' {
    import Component = require('__gamekernel/core/component');
    import events = require('__gamekernel/core/events');
    import Callback = events.Callback;
    import Entity = require('__gamekernel/core/entity');
    class Table<T extends Component> {
        attach(entity: Entity, component: T): T;
        detach(entity: Entity, component: T): T;
        detachAllFrom(entity: Entity): T[];
        compact(): void;
        on(event: string, callback: Callback<T>): void;
        off(event: string, callback: Callback<T>): void;
        reset(): void;
        attached(callback: Callback<T>): void;
        components(entity: Entity, callback: Callback<T>): void;
        getAttached(): T[];
        getComponents(entity: Entity): T[];
    }
    export = Table;
}

declare module '__gamekernel/core/database' {
    import Table = require('__gamekernel/core/table');
    import Component = require('__gamekernel/core/component');
    import Entity = require('__gamekernel/core/entity');
    class Database {
        table<T extends Component>(): Table<T>;
        drop<T extends Component>(table: Table<T>): Table<T>;
        entity(parent?: Entity): Entity;
        destroy(entity: Entity): Entity;
        compact(): void;
        reset(): void;
        getChildren(entity: Entity): Entity[];
        getParent(entity: Entity): Entity;
        isAlive(entity: Entity): boolean;
    }
    export = Database;
}

declare module '__gamekernel/core/kernel' {
    import System = require('__gamekernel/core/system');
    import Database = require('__gamekernel/core/database');
    import Entity = require('__gamekernel/core/entity');
    class Kernel {
        db: Database;
        attach(system: System): void;
        detach(system: System): void;
        tick(delta: number): void;
        nextTick(callback: () => any): void;
        render(delta: number): void;
        root(): Entity;
        resetRoot(): void;
        reset(): void;
    }
    export = Kernel;
}

declare module '__gamekernel/core/system' {
    import Database = require('__gamekernel/core/database');
    class System {
        onAttach(db: Database): void;
        onDetach(db: Database): void;
        before(delta: number): void;
        update(delta: number): void;
        after(delta: number): void;
        render(delta: number): void;
    }
    export = System;
}

declare module '__gamekernel/plugin/behavior-system' {
    import Database = require('__gamekernel/core/database');
    import System = require('__gamekernel/core/system');
    import Table = require('__gamekernel/core/table');
    import Behavior = require('__gamekernel/plugin/behavior');
    class BehaviorSystem extends System {
        table: Table<Behavior>;
        onAttach(db: Database): void;
        onDetach(db: Database): void;
        update(delta: number): void;
    }
    export = BehaviorSystem;
}

declare module '__gamekernel/plugin/behavior' {
    import Component = require('__gamekernel/core/component');
    class Behavior extends Component {
        update(delta: number): void;
    }
    export = Behavior;
}

declare module '__gamekernel/core/util' {
    export function backwards<T>(array: T[], callback: (el: T) => any): void;
    export function each<T>(array: T[], callback: (el: T) => any): void;
    export function safeEach<T>(array: T[], callback: (el: T) => any): void;
    export function remove<T>(array: T[], item: T): void;
    export function nullify<T>(array: T[], item: T): void;
    export function compact<T>(array: T[]): void;
    export interface Constructor {
        (): void;
    }
    export function extend(Klass: Constructor, OtherKlass: Constructor): Constructor;
    export interface NumericMap<V> {
        [key: number]: V;
    }
    export interface StringMap<V> {
        [key: string]: V;
    }
}

declare module '__gamekernel/core/runner' {
    import Kernel = require('__gamekernel/core/kernel');
    import events = require('__gamekernel/core/events');
    import Emitter = events.Emitter;
    class Runner {
        static BEGIN_EVENT: string;
        static END_EVENT: string;
        _stopped: boolean;
        _prevTime: number;
        _emitter: Emitter<void>;
        _elapsed: number;
        _tickLength: number;
        _kernel: Kernel;
        constructor(kernel: Kernel, tickRate: number);
        start(): void;
        stop(): void;
        on(event: string, callback: () => void): void;
        off(event: string, callback: () => void): void;
    }
    export = Runner;
}

declare module '__gamekernel/core/engine' {
    import Kernel = require('__gamekernel/core/kernel');
    class Engine {
        kernel: Kernel;
        constructor(kernel: Kernel);
    }
    export = Engine;
}

declare module '__gamekernel/state/state' {
    import StateMachine = require('__gamekernel/state/state-machine');
    class State {
        attach(machine: StateMachine): void;
        begin(): void;
        update(delta: number): void;
        end(): void;
        transition(stateName: string): State;
    }
    export = State;
}

declare module '__gamekernel/state/state-machine' {
    import State = require('__gamekernel/state/state');
    import StateMap = require('__gamekernel/state/state-map');
    class StateMachine {
        constructor(states: StateMap);
        begin(): void;
        update(delta: number): void;
        end(): void;
        state(name: string): State;
        currentState(): State;
        setState(name: string): State;
    }
    export = StateMachine;
}

declare module '__gamekernel/core/welder' {
    import Entity = require('__gamekernel/core/entity');
    import Component = require('__gamekernel/core/component');
    import Table = require('__gamekernel/core/table');
    export interface Welder<ComponentClass extends Component, Args> {
        attach(e: Entity, args: Args): ComponentClass;
        detach(e: Entity, c: ComponentClass): ComponentClass;
    }
    export class StandardWelder<C extends Component, Args> implements Welder<C, Args> {
        constructor(table: Table<C>, builder: (args: Args) => C);
        attach(e: Entity, args: Args): C;
        detach(e: Entity, c: C): C;
    }
}

declare module '__gamekernel/core/events' {
    export interface Callback<T> {
        (object: T): void;
    }
    export class Emitter<T> {
        constructor(...events: string[]);
        on(event: string, callback: Callback<T>): void;
        off(event: string, callback: Callback<T>): void;
        trigger(event: string, object: T): void;
    }
}

declare module '__gamekernel/core/entity' {
    import Database = require('__gamekernel/core/database');
    class Entity {
        id: number;
        constructor(db: Database, id: number);
        entity(): Entity;
        destroy(): Entity;
        getParent(): Entity;
        getChildren(): Entity[];
        isAlive(): boolean;
    }
    export = Entity;
}

declare module '__gamekernel/state/state-map' {
    import State = require('__gamekernel/state/state');
    interface StateMap {
        [name: string]: State;
    }
    export = StateMap;
}

