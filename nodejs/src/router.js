import kunyu77 from './spider/video/kunyu77.js';
import kkys from './spider/video/kkys.js';
import push from './spider/video/push.js';
import alist from './spider/pan/alist.js';
import _13bqg from './spider/book/13bqg.js';
import copymanga from './spider/book/copymanga.js';
import vcm3u8 from './spider/video/vcm3u8.js';


import douban from './spider/video/douban.js';
import wogg from './spider/video/wogg.js';
import tudou from './spider/video/tudou.js';
import wobg from './spider/video/wobg.js';
import nangua from './spider/video/nangua.js';
import ysche from './spider/video/ysche.js';
import xiaoya from './spider/video/xiaoya.js';
import cntv from './spider/video/cntv.js';
import xxpan from './spider/video/xxpan.js';
import acfun from './spider/video/acfun.js';
import mayiya from './spider/video/mayiya.js';
import czzy from './spider/video/czzy.js';
import subaibai from './spider/video/subaibai.js';
import yingso from './spider/video/yingso.js';

import ttkx from './spider/video/ttkx.js';
import pansearch from './spider/video/pansearch.js';
import bqr from './spider/video/bqr.js';
import ikan from './spider/video/ikan.js';
import libvio from './spider/video/libvio.js';
import yiso from './spider/video/yiso.js';
import yunpanres from './spider/video/yunpanres.js';


import wenku from './spider/book/wenku.js';
import bengou_open from './spider/book/bengou_open.js';
import laobaigs from './spider/book/laobaigs.js';
import baozi from './spider/book/baozi.js';
import coco from './spider/book/coco.js';
import fengche from './spider/book/fengche.js';




const spiders = [kunyu77, kkys, tudou, czzy, nangua, subaibai, mayiya, douban, xiaoya, libvio, ikan, bqr, ysche, ttkx, yingso, yunpanres, pansearch, cntv, wogg, wobg, xxpan, yiso, acfun, vcm3u8, wenku, coco, baozi, fengche, laobaigs, bengou_open, push, alist, _13bqg, copymanga];
const spiderPrefix = '/spider';

/**
 * A function to initialize the router.
 *
 * @param {Object} fastify - The Fastify instance
 * @return {Promise<void>} - A Promise that resolves when the router is initialized
 */
export default async function router(fastify) {
    // register all spider router
    spiders.forEach((spider) => {
        const path = spiderPrefix + '/' + spider.meta.key + '/' + spider.meta.type;
        fastify.register(spider.api, { prefix: path });
        console.log('Register spider: ' + path);
    });
    /**
     * @api {get} /check 检查
     */
    fastify.register(
        /**
         *
         * @param {import('fastify').FastifyInstance} fastify
         */
        async (fastify) => {
            fastify.get(
                '/check',
                /**
                 * check api alive or not
                 * @param {import('fastify').FastifyRequest} _request
                 * @param {import('fastify').FastifyReply} reply
                 */
                async function (_request, reply) {
                    reply.send({ run: !fastify.stop });
                }
            );
            fastify.get(
                '/config',
                /**
                 * get catopen format config
                 * @param {import('fastify').FastifyRequest} _request
                 * @param {import('fastify').FastifyReply} reply
                 */
                async function (_request, reply) {
                    const config = {
                        video: {
                            sites: [],
                        },
                        read: {
                            sites: [],
                        },
                        comic: {
                            sites: [],
                        },
                        music: {
                            sites: [],
                        },
                        pan: {
                            sites: [],
                        },
                        color: fastify.config.color || [],
                    };
                    spiders.forEach((spider) => {
                        let meta = Object.assign({}, spider.meta);
                        meta.api = spiderPrefix + '/' + meta.key + '/' + meta.type;
                        meta.key = 'nodejs_' + meta.key;
                        const stype = spider.meta.type;
                        if (stype < 10) {
                            config.video.sites.push(meta);
                        } else if (stype >= 10 && stype < 20) {
                            config.read.sites.push(meta);
                        } else if (stype >= 20 && stype < 30) {
                            config.comic.sites.push(meta);
                        } else if (stype >= 30 && stype < 40) {
                            config.music.sites.push(meta);
                        } else if (stype >= 40 && stype < 50) {
                            config.pan.sites.push(meta);
                        }
                    });
                    reply.send(config);
                }
            );
        }
    );
}
