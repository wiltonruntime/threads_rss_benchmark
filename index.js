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
    "wilton/thread"
], function(module, Logger, thread) {
    var logger = new Logger(module.id);

    Logger.initConsole("INFO");

    return function(count) {
        var chans = [];
        logger.info("Starting threads ...");
        for (var i = 0; i < count; i++) {
            var ch = thread.run({
                callbackScript: {
                    module: "threads_rss_benchmark/worker"
                },
                shutdownChannelName: "test" + i
            });
            chans.push(ch);
        }
        logger.info("Threads started");

        chans.forEach(function(ch) {
            ch.receiveAndClose();
        });
        logger.info("Threads complete");

    };
});
