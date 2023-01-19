/* esm.sh - esbuild bundle(remark-rehype@10.1.0) es2022 production */
var c = function (t, e, r) {
  var n = { type: String(t) };
  return (
    r == null && (typeof e == "string" || Array.isArray(e))
      ? (r = e)
      : Object.assign(n, e),
    Array.isArray(r) ? (n.children = r) : r != null && (n.value = String(r)),
    n
  );
};
var C = {}.hasOwnProperty;
function dt(t, e) {
  let r = e.data || {};
  return "value" in e &&
    !(C.call(r, "hName") || C.call(r, "hProperties") || C.call(r, "hChildren"))
    ? t.augment(e, c("text", e.value))
    : t(e, "div", a(t, e));
}
function A(t, e, r) {
  let n = e && e.type,
    o;
  if (!n) throw new Error("Expected node, got `" + e + "`");
  return (
    C.call(t.handlers, n)
      ? (o = t.handlers[n])
      : t.passThrough && t.passThrough.includes(n)
      ? (o = ht)
      : (o = t.unknownHandler),
    (typeof o == "function" ? o : dt)(t, e, r)
  );
}
function ht(t, e) {
  return "children" in e ? { ...e, children: a(t, e) } : e;
}
function a(t, e) {
  let r = [];
  if ("children" in e) {
    let n = e.children,
      o = -1;
    for (; ++o < n.length; ) {
      let i = A(t, n[o], e);
      if (i) {
        if (
          o &&
          n[o - 1].type === "break" &&
          (!Array.isArray(i) &&
            i.type === "text" &&
            (i.value = i.value.replace(/^\s+/, "")),
          !Array.isArray(i) && i.type === "element")
        ) {
          let u = i.children[0];
          u && u.type === "text" && (u.value = u.value.replace(/^\s+/, ""));
        }
        Array.isArray(i) ? r.push(...i) : r.push(i);
      }
    }
  }
  return r;
}
var S = function (t) {
  if (t == null) return yt;
  if (typeof t == "string") return Ft(t);
  if (typeof t == "object") return Array.isArray(t) ? xt(t) : gt(t);
  if (typeof t == "function") return E(t);
  throw new Error("Expected function, string, or object as test");
};
function xt(t) {
  let e = [],
    r = -1;
  for (; ++r < t.length; ) e[r] = S(t[r]);
  return E(n);
  function n(...o) {
    let i = -1;
    for (; ++i < e.length; ) if (e[i].call(this, ...o)) return !0;
    return !1;
  }
}
function gt(t) {
  return E(e);
  function e(r) {
    let n;
    for (n in t) if (r[n] !== t[n]) return !1;
    return !0;
  }
}
function Ft(t) {
  return E(e);
  function e(r) {
    return r && r.type === t;
  }
}
function E(t) {
  return e;
  function e(...r) {
    return Boolean(t.call(this, ...r));
  }
}
function yt() {
  return !0;
}
var At = !0,
  bt = "skip",
  T = !1,
  U = function (t, e, r, n) {
    typeof e == "function" &&
      typeof r != "function" &&
      ((n = r), (r = e), (e = null));
    let o = S(e),
      i = n ? -1 : 1;
    u(t, null, [])();
    function u(f, s, l) {
      let p = typeof f == "object" && f !== null ? f : {},
        m;
      return (
        typeof p.type == "string" &&
          ((m =
            typeof p.tagName == "string"
              ? p.tagName
              : typeof p.name == "string"
              ? p.name
              : void 0),
          Object.defineProperty(L, "name", {
            value: "node (" + (p.type + (m ? "<" + m + ">" : "")) + ")",
          })),
        L
      );
      function L() {
        let F = [],
          y,
          g,
          R;
        if (
          (!e || o(f, s, l[l.length - 1] || null)) &&
          ((F = Ct(r(f, l))), F[0] === T)
        )
          return F;
        if (f.children && F[0] !== bt)
          for (
            g = (n ? f.children.length : -1) + i, R = l.concat(f);
            g > -1 && g < f.children.length;

          ) {
            if (((y = u(f.children[g], g, R)()), y[0] === T)) return y;
            g = typeof y[1] == "number" ? y[1] : g + i;
          }
        return F;
      }
    }
  };
function Ct(t) {
  return Array.isArray(t) ? t : typeof t == "number" ? [At, t] : [t];
}
var w = function (t, e, r, n) {
  typeof e == "function" &&
    typeof r != "function" &&
    ((n = r), (r = e), (e = null)),
    U(t, e, o, n);
  function o(i, u) {
    let f = u[u.length - 1];
    return r(i, f ? f.children.indexOf(i) : null, f);
  }
};
var k = v("start"),
  B = v("end");
function v(t) {
  return e;
  function e(r) {
    let n = (r && r.position && r.position[t]) || {};
    return {
      line: n.line || null,
      column: n.column || null,
      offset: n.offset > -1 ? n.offset : null,
    };
  }
}
function z(t) {
  return (
    !t ||
    !t.position ||
    !t.position.start ||
    !t.position.start.line ||
    !t.position.start.column ||
    !t.position.end ||
    !t.position.end.line ||
    !t.position.end.column
  );
}
var H = {}.hasOwnProperty;
function q(t) {
  let e = Object.create(null);
  if (!t || !t.type) throw new Error("mdast-util-definitions expected node");
  return (
    w(t, "definition", (n) => {
      let o = j(n.identifier);
      o && !H.call(e, o) && (e[o] = n);
    }),
    r
  );
  function r(n) {
    let o = j(n);
    return o && H.call(e, o) ? e[o] : null;
  }
}
function j(t) {
  return String(t || "").toUpperCase();
}
var Z =
  /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
var Kt = x(/[A-Za-z]/),
  Xt = x(/\d/),
  _t = x(/[\dA-Fa-f]/),
  O = x(/[\dA-Za-z]/),
  $t = x(/[!-/:-@[-`{-~]/),
  Mt = x(/[#-'*+\--9=?A-Z^-~]/);
var Vt = x(/\s/),
  Wt = x(Z);
function x(t) {
  return e;
  function e(r) {
    return r !== null && t.test(String.fromCharCode(r));
  }
}
function h(t) {
  let e = [],
    r = -1,
    n = 0,
    o = 0;
  for (; ++r < t.length; ) {
    let i = t.charCodeAt(r),
      u = "";
    if (i === 37 && O(t.charCodeAt(r + 1)) && O(t.charCodeAt(r + 2))) o = 2;
    else if (i < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i)) ||
        (u = String.fromCharCode(i));
    else if (i > 55295 && i < 57344) {
      let f = t.charCodeAt(r + 1);
      i < 56320 && f > 56319 && f < 57344
        ? ((u = String.fromCharCode(i, f)), (o = 1))
        : (u = "\uFFFD");
    } else u = String.fromCharCode(i);
    u &&
      (e.push(t.slice(n, r), encodeURIComponent(u)), (n = r + o + 1), (u = "")),
      o && ((r += o), (o = 0));
  }
  return e.join("") + t.slice(n);
}
function d(t, e) {
  let r = [],
    n = -1;
  for (
    e &&
    r.push(
      c(
        "text",
        `
`
      )
    );
    ++n < t.length;

  )
    n &&
      r.push(
        c(
          "text",
          `
`
        )
      ),
      r.push(t[n]);
  return (
    e &&
      t.length > 0 &&
      r.push(
        c(
          "text",
          `
`
        )
      ),
    r
  );
}
function J(t) {
  let e = -1,
    r = [];
  for (; ++e < t.footnoteOrder.length; ) {
    let n = t.footnoteById[t.footnoteOrder[e].toUpperCase()];
    if (!n) continue;
    let o = a(t, n),
      i = String(n.identifier),
      u = h(i.toLowerCase()),
      f = 0,
      s = [];
    for (; ++f <= t.footnoteCounts[i]; ) {
      let m = {
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t.clobberPrefix + "fnref-" + u + (f > 1 ? "-" + f : ""),
          dataFootnoteBackref: !0,
          className: ["data-footnote-backref"],
          ariaLabel: t.footnoteBackLabel,
        },
        children: [{ type: "text", value: "\u21A9" }],
      };
      f > 1 &&
        m.children.push({
          type: "element",
          tagName: "sup",
          children: [{ type: "text", value: String(f) }],
        }),
        s.length > 0 && s.push({ type: "text", value: " " }),
        s.push(m);
    }
    let l = o[o.length - 1];
    if (l && l.type === "element" && l.tagName === "p") {
      let m = l.children[l.children.length - 1];
      m && m.type === "text"
        ? (m.value += " ")
        : l.children.push({ type: "text", value: " " }),
        l.children.push(...s);
    } else o.push(...s);
    let p = {
      type: "element",
      tagName: "li",
      properties: { id: t.clobberPrefix + "fn-" + u },
      children: d(o, !0),
    };
    n.position && (p.position = n.position), r.push(p);
  }
  return r.length === 0
    ? null
    : {
        type: "element",
        tagName: "section",
        properties: { dataFootnotes: !0, className: ["footnotes"] },
        children: [
          {
            type: "element",
            tagName: t.footnoteLabelTagName,
            properties: {
              ...JSON.parse(JSON.stringify(t.footnoteLabelProperties)),
              id: "footnote-label",
            },
            children: [c("text", t.footnoteLabel)],
          },
          {
            type: "text",
            value: `
`,
          },
          {
            type: "element",
            tagName: "ol",
            properties: {},
            children: d(r, !0),
          },
          {
            type: "text",
            value: `
`,
          },
        ],
      };
}
function K(t, e) {
  return t(e, "blockquote", d(a(t, e), !0));
}
function X(t, e) {
  return [
    t(e, "br"),
    c(
      "text",
      `
`
    ),
  ];
}
function _(t, e) {
  let r = e.value
      ? e.value +
        `
`
      : "",
    n = e.lang && e.lang.match(/^[^ \t]+(?=[ \t]|$)/),
    o = {};
  n && (o.className = ["language-" + n]);
  let i = t(e, "code", o, [c("text", r)]);
  return e.meta && (i.data = { meta: e.meta }), t(e.position, "pre", [i]);
}
function $(t, e) {
  return t(e, "del", a(t, e));
}
function M(t, e) {
  return t(e, "em", a(t, e));
}
function D(t, e) {
  let r = String(e.identifier),
    n = h(r.toLowerCase()),
    o = t.footnoteOrder.indexOf(r),
    i;
  o === -1
    ? (t.footnoteOrder.push(r),
      (t.footnoteCounts[r] = 1),
      (i = t.footnoteOrder.length))
    : (t.footnoteCounts[r]++, (i = o + 1));
  let u = t.footnoteCounts[r];
  return t(e, "sup", [
    t(
      e.position,
      "a",
      {
        href: "#" + t.clobberPrefix + "fn-" + n,
        id: t.clobberPrefix + "fnref-" + n + (u > 1 ? "-" + u : ""),
        dataFootnoteRef: !0,
        ariaDescribedBy: "footnote-label",
      },
      [c("text", String(i))]
    ),
  ]);
}
function V(t, e) {
  let r = t.footnoteById,
    n = 1;
  for (; n in r; ) n++;
  let o = String(n);
  return (
    (r[o] = {
      type: "footnoteDefinition",
      identifier: o,
      children: [{ type: "paragraph", children: e.children }],
      position: e.position,
    }),
    D(t, { type: "footnoteReference", identifier: o, position: e.position })
  );
}
function W(t, e) {
  return t(e, "h" + e.depth, a(t, e));
}
function Y(t, e) {
  return t.dangerous ? t.augment(e, c("raw", e.value)) : null;
}
function N(t, e) {
  let r = e.referenceType,
    n = "]";
  if (
    (r === "collapsed"
      ? (n += "[]")
      : r === "full" && (n += "[" + (e.label || e.identifier) + "]"),
    e.type === "imageReference")
  )
    return c("text", "![" + e.alt + n);
  let o = a(t, e),
    i = o[0];
  i && i.type === "text"
    ? (i.value = "[" + i.value)
    : o.unshift(c("text", "["));
  let u = o[o.length - 1];
  return u && u.type === "text" ? (u.value += n) : o.push(c("text", n)), o;
}
function G(t, e) {
  let r = t.definition(e.identifier);
  if (!r) return N(t, e);
  let n = { src: h(r.url || ""), alt: e.alt };
  return (
    r.title !== null && r.title !== void 0 && (n.title = r.title),
    t(e, "img", n)
  );
}
function Q(t, e) {
  let r = { src: h(e.url), alt: e.alt };
  return (
    e.title !== null && e.title !== void 0 && (r.title = e.title),
    t(e, "img", r)
  );
}
function tt(t, e) {
  return t(e, "code", [c("text", e.value.replace(/\r?\n|\r/g, " "))]);
}
function et(t, e) {
  let r = t.definition(e.identifier);
  if (!r) return N(t, e);
  let n = { href: h(r.url || "") };
  return (
    r.title !== null && r.title !== void 0 && (n.title = r.title),
    t(e, "a", n, a(t, e))
  );
}
function rt(t, e) {
  let r = { href: h(e.url) };
  return (
    e.title !== null && e.title !== void 0 && (r.title = e.title),
    t(e, "a", r, a(t, e))
  );
}
function nt(t, e, r) {
  let n = a(t, e),
    o = r ? Et(r) : ot(e),
    i = {},
    u = [];
  if (typeof e.checked == "boolean") {
    let l;
    n[0] && n[0].type === "element" && n[0].tagName === "p"
      ? (l = n[0])
      : ((l = t(null, "p", [])), n.unshift(l)),
      l.children.length > 0 && l.children.unshift(c("text", " ")),
      l.children.unshift(
        t(null, "input", { type: "checkbox", checked: e.checked, disabled: !0 })
      ),
      (i.className = ["task-list-item"]);
  }
  let f = -1;
  for (; ++f < n.length; ) {
    let l = n[f];
    (o || f !== 0 || l.type !== "element" || l.tagName !== "p") &&
      u.push(
        c(
          "text",
          `
`
        )
      ),
      l.type === "element" && l.tagName === "p" && !o
        ? u.push(...l.children)
        : u.push(l);
  }
  let s = n[n.length - 1];
  return (
    s &&
      (o || !("tagName" in s) || s.tagName !== "p") &&
      u.push(
        c(
          "text",
          `
`
        )
      ),
    t(e, "li", i, u)
  );
}
function Et(t) {
  let e = t.spread,
    r = t.children,
    n = -1;
  for (; !e && ++n < r.length; ) e = ot(r[n]);
  return Boolean(e);
}
function ot(t) {
  let e = t.spread;
  return e ?? t.children.length > 1;
}
function it(t, e) {
  let r = {},
    n = e.ordered ? "ol" : "ul",
    o = a(t, e),
    i = -1;
  for (
    typeof e.start == "number" && e.start !== 1 && (r.start = e.start);
    ++i < o.length;

  ) {
    let u = o[i];
    if (
      u.type === "element" &&
      u.tagName === "li" &&
      u.properties &&
      Array.isArray(u.properties.className) &&
      u.properties.className.includes("task-list-item")
    ) {
      r.className = ["contains-task-list"];
      break;
    }
  }
  return t(e, n, r, d(o, !0));
}
function ut(t, e) {
  return t(e, "p", a(t, e));
}
function lt(t, e) {
  return t.augment(e, c("root", d(a(t, e))));
}
function ft(t, e) {
  return t(e, "strong", a(t, e));
}
function ct(t, e) {
  let r = e.children,
    n = -1,
    o = e.align || [],
    i = [];
  for (; ++n < r.length; ) {
    let u = r[n].children,
      f = n === 0 ? "th" : "td",
      s = [],
      l = -1,
      p = e.align ? o.length : u.length;
    for (; ++l < p; ) {
      let m = u[l];
      s.push(t(m, f, { align: o[l] }, m ? a(t, m) : []));
    }
    i[n] = t(r[n], "tr", d(s, !0));
  }
  return t(
    e,
    "table",
    d(
      [t(i[0].position, "thead", d([i[0]], !0))].concat(
        i[1]
          ? t(
              { start: k(i[1]), end: B(i[i.length - 1]) },
              "tbody",
              d(i.slice(1), !0)
            )
          : []
      ),
      !0
    )
  );
}
function st(t) {
  let e = String(t),
    r = /\r?\n|\r/g,
    n = r.exec(e),
    o = 0,
    i = [];
  for (; n; )
    i.push(at(e.slice(o, n.index), o > 0, !0), n[0]),
      (o = n.index + n[0].length),
      (n = r.exec(e));
  return i.push(at(e.slice(o), o > 0, !1)), i.join("");
}
function at(t, e, r) {
  let n = 0,
    o = t.length;
  if (e) {
    let i = t.codePointAt(n);
    for (; i === 9 || i === 32; ) n++, (i = t.codePointAt(n));
  }
  if (r) {
    let i = t.codePointAt(o - 1);
    for (; i === 9 || i === 32; ) o--, (i = t.codePointAt(o - 1));
  }
  return o > n ? t.slice(n, o) : "";
}
function pt(t, e) {
  return t.augment(e, c("text", st(String(e.value))));
}
function mt(t, e) {
  return t(e, "hr");
}
var b = {
  blockquote: K,
  break: X,
  code: _,
  delete: $,
  emphasis: M,
  footnoteReference: D,
  footnote: V,
  heading: W,
  html: Y,
  imageReference: G,
  image: Q,
  inlineCode: tt,
  linkReference: et,
  link: rt,
  listItem: nt,
  list: it,
  paragraph: ut,
  root: lt,
  strong: ft,
  table: ct,
  text: pt,
  thematicBreak: mt,
  toml: P,
  yaml: P,
  definition: P,
  footnoteDefinition: P,
};
function P() {
  return null;
}
var wt = {}.hasOwnProperty;
function kt(t, e) {
  let r = e || {},
    n = r.allowDangerousHtml || !1,
    o = {};
  return (
    (u.dangerous = n),
    (u.clobberPrefix =
      r.clobberPrefix === void 0 || r.clobberPrefix === null
        ? "user-content-"
        : r.clobberPrefix),
    (u.footnoteLabel = r.footnoteLabel || "Footnotes"),
    (u.footnoteLabelTagName = r.footnoteLabelTagName || "h2"),
    (u.footnoteLabelProperties = r.footnoteLabelProperties || {
      className: ["sr-only"],
    }),
    (u.footnoteBackLabel = r.footnoteBackLabel || "Back to content"),
    (u.definition = q(t)),
    (u.footnoteById = o),
    (u.footnoteOrder = []),
    (u.footnoteCounts = {}),
    (u.augment = i),
    (u.handlers = { ...b, ...r.handlers }),
    (u.unknownHandler = r.unknownHandler),
    (u.passThrough = r.passThrough),
    w(t, "footnoteDefinition", (f) => {
      let s = String(f.identifier).toUpperCase();
      wt.call(o, s) || (o[s] = f);
    }),
    u
  );
  function i(f, s) {
    if (f && "data" in f && f.data) {
      let l = f.data;
      l.hName &&
        (s.type !== "element" &&
          (s = { type: "element", tagName: "", properties: {}, children: [] }),
        (s.tagName = l.hName)),
        s.type === "element" &&
          l.hProperties &&
          (s.properties = { ...s.properties, ...l.hProperties }),
        "children" in s &&
          s.children &&
          l.hChildren &&
          (s.children = l.hChildren);
    }
    if (f) {
      let l = "type" in f ? f : { position: f };
      z(l) || (s.position = { start: k(l), end: B(l) });
    }
    return s;
  }
  function u(f, s, l, p) {
    return (
      Array.isArray(l) && ((p = l), (l = {})),
      i(f, {
        type: "element",
        tagName: s,
        properties: l || {},
        children: p || [],
      })
    );
  }
}
function I(t, e) {
  let r = kt(t, e),
    n = A(r, t, null),
    o = J(r);
  return (
    o &&
      n.children.push(
        c(
          "text",
          `
`
        ),
        o
      ),
    Array.isArray(n) ? { type: "root", children: n } : n
  );
}
var Bt = function (t, e) {
    return t && "run" in t ? Nt(t, e) : Pt(t || e);
  },
  Dt = Bt;
function Nt(t, e) {
  return (r, n, o) => {
    t.run(I(r, e), n, (i) => {
      o(i);
    });
  };
}
function Pt(t) {
  return (e) => I(e, t);
}
export { a as all, Dt as default, b as defaultHandlers, A as one };
