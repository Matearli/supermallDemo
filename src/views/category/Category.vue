<template>
 <div class="wrapper">
   <ul class="content">
     <button @click="btnClick">click</button>
     <li>good1</li>
     <li>good2</li>
     <li>good3</li>
     <li>good4</li>
     <li>good5</li>
     <li>good6</li>
     <li>good7</li>
     <li>good8</li>
     <li>good9</li>
     <li>good10</li>
     <li>good11</li>
     <li>good12</li>
     <li>good13</li>
     <li>good14</li>
     <li>good15</li>
     <li>good16</li>
     <li>good17</li>
     <li>good18</li>
     <li>good19</li>
     <li>good20</li>
     <li>good21</li>
     <li>good22</li>
     <li>good23</li>
     <li>good24</li>
     <li>good25</li>
     <li>good26</li>
     <li>good27</li>
     <li>good28</li>
     <li>good29</li>
     <li>good30</li>
     <li>good31</li>
     <li>good32</li>
     <li>good33</li>
     <li>good34</li>
     <li>good35</li>
     <li>good36</li>
     <li>good37</li>
     <li>good38</li>
     <li>good39</li>
     <li>good40</li>
     <li>good41</li>
     <li>good42</li>
     <li>good43</li>
     <li>good44</li>
     <li>good45</li>
     <li>good46</li>
     <li>good47</li>
     <li>good48</li>
     <li>good49</li>
     <li>good50</li>
     <li>good51</li>
     <li>good52</li>
     <li>good53</li>
     <li>good54</li>
     <li>good55</li>
     <li>good56</li>
     <li>good57</li>
     <li>good58</li>
     <li>good59</li>
     <li>good60</li>
     <li>good61</li>
     <li>good62</li>
     <li>good63</li>
     <li>good64</li>
     <li>good65</li>
     <li>good66</li>
     <li>good67</li>
     <li>good68</li>
     <li>good69</li>
     <li>good70</li>
     <li>good71</li>
     <li>good72</li>
     <li>good73</li>
     <li>good74</li>
     <li>good75</li>
     <li>good76</li>
     <li>good77</li>
     <li>good78</li>
     <li>good79</li>
     <li>good80</li>
     <li>good81</li>
     <li>good82</li>
     <li>good83</li>
     <li>good84</li>
     <li>good85</li>
     <li>good86</li>
     <li>good87</li>
     <li>good88</li>
     <li>good89</li>
     <li>good90</li>
     <li>good91</li>
     <li>good92</li>
     <li>good93</li>
     <li>good94</li>
     <li>good95</li>
     <li>good96</li>
     <li>good97</li>
     <li>good98</li>
     <li>good99</li>
     <li>good100</li>
   </ul>
 </div>
</template>

<script>

  import BScroll from  'better-scroll'

  export default {
    name: "Category",
      data(){
        return{
        scroll:null
        }
      },
      created() {

      },
      mounted() {
          this.scroll = new BScroll(document.querySelector(".wrapper"),{
        probeType:3,
        pullUpLoad:true
        })
          this.scroll.on("scroll",(position)=>{

          })
          this.scroll.on("pullingUp",()=>{
              console.log("more");
              setTimeout(()=>{
                  this.scroll.finishPullUp()
              },1000)
          })

      },
      methods:{
          btnClick(){
              console.log("btnClick");
          }
      }
  }
</script>


<style scoped>
.wrapper{
  height: 200px;
  background-color: red;
  overflow: hidden;
}
</style>
