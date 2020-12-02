/*
 * Copyright 2020, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

define([
    "module",
    "wilton/Logger",
    "wilton/misc",
    "wilton/Server"
], function(module, Logger, misc, Server) {
    var logger = new Logger(module.id);

    Logger.initConsole("INFO");

    return function() {
        var server = new Server({
            tcpPort: 8080,
            numberOfThreads: 20,
            views: [
                "threads_rss_benchmark/view"
            ]
        });
        logger.info("Sevrer started");
        misc.waitForSignal();
        server.stop();
        logger.info("Sevrer stopped");
    };
});

