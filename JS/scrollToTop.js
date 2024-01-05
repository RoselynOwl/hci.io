var scrolltotop = {
    setting: {
      startline: 100,
      scrollto: 0,
      scrollduration: 150,
      fadeduration: [300, 100]
    },
    controlHTML:
      '<img src="https://lh3.googleusercontent.com/pw/AM-JKLXYwCUt-Co0XL0bpYbiv3HhTRP_-m9tNF4QN6kMZi8eCQJQJfbJKx5yeigF8-DiPfrORbBgoj_fCrxGMy9vO-WRv_f7kXDWtER1XDp_P1wCS-Qeq9021MdOQGiGvpHcmuTXKcCtUzS-Sev5UDNYupcB=s80-no" />',
    controlattrs: { offsetx: 30, offsety: 20 },
    anchorkeyword: "#top",
    state: { isvisible: false, shouldvisible: false },
    scrollup: function () {
      this.cssfixedsupport || this.$control.css({ opacity: 0 });
      var target =
        isNaN(this.setting.scrollto) ?
        this.setting.scrollto :
        parseInt(this.setting.scrollto);
      target =
        typeof target === "string" && jQuery("#" + target).length ?
        jQuery("#" + target).offset().top :
        0;
      this.$body.animate({ scrollTop: target }, this.setting.scrollduration);
    },
    keepfixed: function () {
      var $window = jQuery(window);
      var bodyWidth = $window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx;
      var bodyHeight = $window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety;
      this.$control.css({ left: bodyWidth + "px", top: bodyHeight + "px" });
    },
    togglecontrol: function () {
      var scrolltop = jQuery(window).scrollTop();
      if (!this.cssfixedsupport) this.keepfixed();
      this.state.shouldvisible = scrolltop >= this.setting.startline ? true : false;
      if (this.state.shouldvisible && !this.state.isvisible) {
        this.$control.stop().animate({ opacity: 1 }, this.setting.fadeduration[0]);
        this.state.isvisible = true;
      } else if (!this.state.shouldvisible && this.state.isvisible) {
        this.$control.stop().animate({ opacity: 0 }, this.setting.fadeduration[1]);
        this.state.isvisible = false;
      }
    },
    init: function () {
      jQuery(document).ready(function ($) {
        var self = scrolltotop;
        var $body = $(
          window.opera ?
          "CSS1Compat" == document.compatMode ?
          "html" :
          "body" :
          "html, body"
        );
        self.cssfixedsupport =
          !document.all ||
          (document.all && "CSS1Compat" == document.compatMode && window.XMLHttpRequest);
        self.$body = $body;
        self.$control = $('<div id="topcontrol">' + self.controlHTML + "</div>")
          .css({
            position: self.cssfixedsupport ? "fixed" : "absolute",
            bottom: self.controlattrs.offsety,
            right: self.controlattrs.offsetx,
            opacity: 0,
            cursor: "pointer"
          })
          .attr({ title: "Scroll to Top" })
          .click(function () {
            self.scrollup();
            return false;
          })
          .appendTo("body");
        if (document.all && !window.XMLHttpRequest && "" != self.$control.text()) {
          self.$control.css({ width: self.$control.width() });
        }
        self.togglecontrol();
        $('a[href="' + self.anchorkeyword + '"]').click(function () {
          self.scrollup();
          return false;
        });
        $(window).bind("scroll resize", function () {
          self.togglecontrol();
        });
      });
    }
  };
  scrolltotop.init();
  