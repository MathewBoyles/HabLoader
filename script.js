var loadingPage = {
  animationIntervals: function(){
    loadingPage.animationTimeouts[loadingPage.animationTimeouts.length] = setTimeout(function(){
      loadingPage.selector('#zod #firstline').hide();
      loadingPage.selector('#zod #endline').show();
    },3000);
    loadingPage.animationTimeouts[loadingPage.animationTimeouts.length] = setTimeout(function(){
      loadingPage.selector('#zod #zodtalking').hide();
      loadingPage.selector('#zod #firstline,#zod #midline,#zod #endline').hide();
      loadingPage.selector('#zod #smilemouth').show();
    },6000);
    loadingPage.animationInterval = setInterval(function(){
      loadingPage.selector('#zod #smilemouth').hide();
      loadingPage.selector('#zod #zodtalking').show();
      loadingPage.selector('#zod #firstline').show();
      loadingPage.animationTimeouts[loadingPage.animationTimeouts.length] = setTimeout(function(){
        loadingPage.selector('#zod #firstline').hide();
        loadingPage.selector('#zod #endline').show();
      },3000);
      loadingPage.animationTimeouts[loadingPage.animationTimeouts.length] = setTimeout(function(){
        loadingPage.selector('#zod #zodtalking').hide();
        loadingPage.selector('#zod #firstline,#zod #midline,#zod #endline').hide();
        loadingPage.selector('#zod #smilemouth').show();
      },6000);
    },9000);
  },
  animationTimeouts: [],
  complete: [],
  count: 0,
  loaded: function(loaded_count){
    if(loadingPage.count>=100) return false;
    loadingPage.count=Math.floor(loaded_count);
    if(loadingPage.count>100) loadingPage.count=100;
    document.title='['+loadingPage.count+'%] '+loadingPage.originalTitle;
    loadingPage.selector('#loading-wrap').width(loadingPage.count*(304/100));
    if(loadingPage.count>=90 && !loadingPage.parts['90']){
      loadingPage.parts['90']=true;
      loadingPage.selector('#zod #endline,#zod #zodtalking').show();
      loadingPage.selector('#zod #closemouth').hide();
      $.each(loadingPage.partTimeout,function(a){
        clearTimeout(loadingPage.partTimeout[a]);
      });
      loadingPage.partTimeout[loadingPage.partTimeout.length]=setTimeout(function(){
        loadingPage.selector('#zod #endline').addClass('goodbye');
        setTimeout(function(){
          loadingPage.selector('#zod #endline').removeClass('goodbye').hide();
        },500);
        loadingPage.selector('#zod #zodtalking').hide();
        loadingPage.selector('#zod #closemouth').show();
      },2000);
    }else if(loadingPage.count>=60 && !loadingPage.parts['60']){
      loadingPage.parts['60']=true;
      loadingPage.selector('#zod #midline,#zod #zodtalking').show();
      loadingPage.selector('#zod #closemouth').hide();
      $.each(loadingPage.partTimeout,function(a){
        clearTimeout(loadingPage.partTimeout[a]);
      });
      loadingPage.partTimeout[loadingPage.partTimeout.length]=setTimeout(function(){
        loadingPage.selector('#zod #midline').addClass('goodbye');
        setTimeout(function(){
          loadingPage.selector('#zod #midline').removeClass('goodbye').hide();
        },500);
        loadingPage.selector('#zod #zodtalking').hide();
        loadingPage.selector('#zod #closemouth').show();
      },2000);
    }else if(loadingPage.count>=20 && !loadingPage.parts['20']){
      loadingPage.parts['20']=true;
      loadingPage.selector('#zod #firstline,#zod #zodtalking').show();
      loadingPage.selector('#zod #closemouth').hide();
      $.each(loadingPage.partTimeout,function(a){
        clearTimeout(loadingPage.partTimeout[a]);
      });
      loadingPage.partTimeout[loadingPage.partTimeout.length]=setTimeout(function(){
        loadingPage.selector('#zod #firstline').addClass('goodbye');
        setTimeout(function(){
          loadingPage.selector('#zod #firstline').removeClass('goodbye').hide();
        },500);
        loadingPage.selector('#zod #zodtalking').hide();
        loadingPage.selector('#zod #closemouth').show();
      },2000);
    }
    if(loadingPage.count>=100){
      loadingPage.selector('#zod #zodtalking,#zod #closemouth,#zod #firstline,#zod #midline,#zod #endline').hide();
      loadingPage.selector('#zod #smilemouth').show();
      $.each(loadingPage.partTimeout,function(a){
        clearTimeout(loadingPage.partTimeout[a]);
      });
      setTimeout(function(){
        loadingPage.selector().addClass('loaded');
        loadingPage.selector('#zod *:visible').fadeOut('slow');
        setTimeout(function(){
          loadingPage.selector().fadeOut('slow');
          document.title=loadingPage.originalTitle;
          $.each(loadingPage.complete,function(a){
            loadingPage.complete[a].call();
          });
        },500);
      },1000);
    }
  },
  originalTitle: document.title,
  parts: [],
  partTimeout: [],
  reset: function(){
    loadingPage.parts=[];
    loadingPage.selector().removeClass('loaded');
    loadingPage.selector().fadeIn('slow');
    loadingPage.selector('#zod,#zod *').hide();
    loadingPage.selector('#zod #closemouth').show();
    loadingPage.selector('#zod').fadeIn('slow',function(){
      loadingPage.selector('#zod #firstline').hide();
      loadingPage.selector('#zod #endline').show();
    });
    loadingPage.count=0;
    document.title='[0%] '+loadingPage.originalTitle;
    loadingPage.selector().addClass('resetting');
    loadingPage.selector('#loading-wrap').width(0);
    setTimeout(function(){loadingPage.selector().removeClass('resetting');},50);
  },
  selector: function(selector_find){
    var r = $('#loading');
    if(selector_find) r=r.find(selector_find);
    return r;
  }
};

loadingPage.complete[loadingPage.complete.length] = function(){
  clearInterval(loadingPage.autoInterval);
};
loadingPage.autoInterval = setInterval(function(){
  loadingPage.loaded(Math.floor(loadingPage.count+(Math.random()*10)));
},600);