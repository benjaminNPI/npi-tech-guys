import { Fragment, useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { AudioPlayer } from '@/components/player/AudioPlayer'
import posterImage from '@/images/poster.png'

function randomBetween(min, max, seed = 1) {
  return () => {
    let rand = Math.sin(seed++) * 10000
    rand = rand - Math.floor(rand)
    return Math.floor(rand * (max - min + 1) + min)
  }
}

function Waveform(props) {
  let id = useId()
  let bars = {
    total: 100,
    width: 2,
    gap: 2,
    minHeight: 40,
    maxHeight: 100,
  }

  let barHeights = Array.from(
    { length: bars.total },
    randomBetween(bars.minHeight, bars.maxHeight)
  )

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="40%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
        <linearGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="#4989E8" />
          <stop offset="50%" stopColor="#6159DA" />
          <stop offset="100%" stopColor="#FF54AD" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-pattern)`} />
        </mask>
        <pattern
          id={`${id}-pattern`}
          width={bars.total * bars.width + bars.total * bars.gap}
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          {Array.from({ length: bars.total }, (_, index) => (
            <rect
              key={index}
              width={bars.width}
              height={`${barHeights[index]}%`}
              x={bars.gap * (index + 1) + bars.width * index}
              fill={`url(#${id}-fade)`}
            />
          ))}
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${id}-gradient)`}
        mask={`url(#${id}-mask)`}
        opacity="0.25"
      />
    </svg>
  )
}

function TinyWaveFormIcon({ colors = [], ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path
        d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z"
        className={colors[0]}
      />
      <path
        d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z"
        className={colors[1]}
      />
    </svg>
  )
}

function SpotifyIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path d="M15.8 3a12.8 12.8 0 1 0 0 25.6 12.8 12.8 0 0 0 0-25.6Zm5.87 18.461a.8.8 0 0 1-1.097.266c-3.006-1.837-6.787-2.252-11.244-1.234a.796.796 0 1 1-.355-1.555c4.875-1.115 9.058-.635 12.432 1.427a.8.8 0 0 1 .265 1.096Zm1.565-3.485a.999.999 0 0 1-1.371.33c-3.44-2.116-8.685-2.728-12.755-1.493a1 1 0 0 1-.58-1.91c4.65-1.41 10.428-.726 14.378 1.7a1 1 0 0 1 .33 1.375l-.002-.002Zm.137-3.629c-4.127-2.45-10.933-2.675-14.871-1.478a1.196 1.196 0 1 1-.695-2.291c4.52-1.374 12.037-1.107 16.785 1.711a1.197 1.197 0 1 1-1.221 2.06" />
    </svg>
  )
}

function ApplePodcastIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.528 24.8c-.232.592-.768 1.424-1.536 2.016-.44.336-.968.664-1.688.88-.768.232-1.72.304-2.904.304H10.6c-1.184 0-2.128-.08-2.904-.304a4.99 4.99 0 0 1-1.688-.88c-.76-.584-1.304-1.424-1.536-2.016C4.008 23.608 4 22.256 4 21.4V10.6c0-.856.008-2.208.472-3.4.232-.592.768-1.424 1.536-2.016.44-.336.968-.664 1.688-.88C8.472 4.08 9.416 4 10.6 4h10.8c1.184 0 2.128.08 2.904.304a4.99 4.99 0 0 1 1.688.88c.76.584 1.304 1.424 1.536 2.016C28 8.392 28 9.752 28 10.6v10.8c0 .856-.008 2.208-.472 3.4Zm-9.471-6.312a1.069 1.069 0 0 0-.32-.688c-.36-.376-.992-.624-1.736-.624-.745 0-1.377.24-1.737.624-.183.2-.287.4-.32.688-.063.558-.024 1.036.04 1.807v.009c.065.736.184 1.72.336 2.712.112.712.2 1.096.28 1.368.136.448.625.832 1.4.832.776 0 1.273-.392 1.4-.832.08-.272.169-.656.28-1.368.152-1 .273-1.976.337-2.712.072-.776.104-1.256.04-1.816ZM16 16.375c1.088 0 1.968-.88 1.968-1.967 0-1.08-.88-1.968-1.968-1.968s-1.968.88-1.968 1.968.88 1.967 1.968 1.967Zm-.024-9.719c-4.592.016-8.352 3.744-8.416 8.336-.048 3.72 2.328 6.904 5.648 8.072.08.032.16-.04.152-.12a35.046 35.046 0 0 0-.041-.288c-.029-.192-.057-.384-.079-.576a.317.317 0 0 0-.168-.232 7.365 7.365 0 0 1-4.424-6.824c.04-4 3.304-7.256 7.296-7.288 4.088-.032 7.424 3.28 7.424 7.36 0 3.016-1.824 5.608-4.424 6.752a.272.272 0 0 0-.168.232l-.12.864c-.016.088.072.152.152.12a8.448 8.448 0 0 0 5.648-7.968c-.016-4.656-3.816-8.448-8.48-8.44Zm-5.624 8.376c.04-2.992 2.44-5.464 5.432-5.576 3.216-.128 5.88 2.456 5.872 5.64a5.661 5.661 0 0 1-2.472 4.672c-.08.056-.184-.008-.176-.096.016-.344.024-.648.008-.96 0-.104.04-.2.112-.272a4.584 4.584 0 0 0 1.448-3.336 4.574 4.574 0 0 0-4.752-4.568 4.585 4.585 0 0 0-4.392 4.448 4.574 4.574 0 0 0 1.448 3.456c.08.072.12.168.112.272-.016.32-.016.624.008.968 0 .088-.104.144-.176.096a5.65 5.65 0 0 1-2.472-4.744Z"
      />
    </svg>
  )
}

function AmazonMusic(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px" {...props}><path d="M 14 4 C 8.4886661 4 4 8.4886661 4 14 L 4 36 C 4 41.511334 8.4886661 46 14 46 L 36 46 C 41.511334 46 46 41.511334 46 36 L 46 14 C 46 8.4886661 41.511334 4 36 4 L 14 4 z M 14 6 L 36 6 C 40.430666 6 44 9.5693339 44 14 L 44 36 C 44 40.430666 40.430666 44 36 44 L 14 44 C 9.5693339 44 6 40.430666 6 36 L 6 14 C 6 9.5693339 9.5693339 6 14 6 z M 34 18.009766 A 1 1 0 0 0 34 20.009766 A 1 1 0 0 0 34 18.009766 z M 9.25 21.009766 L 9.25 28.009766 L 10.75 28.009766 L 10.75 22.869141 C 11.242668 22.749795 11.737199 22.63579 12.226562 22.505859 C 12.726563 22.369859 13.202141 22.740016 13.244141 23.166016 L 13.251953 28.009766 L 14.751953 28.009766 L 14.753906 25.509766 L 14.759766 24.259766 L 14.753906 23.634766 L 14.75 23.318359 C 14.741534 23.172558 14.723729 23.027965 14.689453 22.884766 C 15.202471 22.760846 15.717076 22.641132 16.226562 22.505859 C 16.726562 22.368859 17.202141 22.741016 17.244141 23.166016 L 17.251953 28.009766 L 18.751953 28.009766 L 18.753906 25.509766 L 18.759766 24.259766 L 18.753906 23.634766 L 18.75 23.318359 C 18.741 23.163359 18.724547 23.009422 18.685547 22.857422 C 18.538547 22.248422 18.123797 21.725453 17.591797 21.439453 C 17.064797 21.146453 16.394375 21.108828 15.859375 21.298828 C 15.293468 21.491767 14.731792 21.700512 14.169922 21.908203 C 14.00164 21.721438 13.810124 21.556824 13.591797 21.439453 C 13.064797 21.146453 12.394375 21.108828 11.859375 21.298828 C 11.487747 21.42553 11.119723 21.565445 10.75 21.699219 L 10.75 21.009766 L 9.25 21.009766 z M 21.75 21.009766 L 20.251953 21.011719 L 20.253906 23.431641 C 20.244906 24.254641 20.236672 25.008672 20.263672 25.888672 C 20.306672 26.502672 20.640031 27.061969 21.082031 27.417969 C 21.527031 27.778969 22.073234 27.968906 22.615234 28.003906 C 23.137234 28.046906 23.749859 27.888156 24.130859 27.660156 C 24.171208 27.639321 24.209897 27.615122 24.25 27.59375 L 24.25 27.828125 L 25.75 27.828125 L 25.75 21.011719 L 24.25 21.011719 L 24.25 26.365234 C 24.038477 26.438556 23.825083 26.508305 23.617188 26.589844 C 23.265187 26.738844 23.038422 26.764469 22.732422 26.730469 C 22.158422 26.660469 21.720859 26.2035 21.755859 25.8125 C 21.764859 25.0805 21.767906 24.219687 21.753906 23.429688 L 21.75 21.009766 z M 33.25 21.009766 L 33.25 28.009766 L 34.75 28.009766 L 34.75 21.009766 L 33.25 21.009766 z M 39.224609 21.013672 C 38.869609 21.033547 38.514453 21.114406 38.189453 21.253906 C 36.869453 21.831906 36.22 23.191344 36.25 24.402344 C 36.26 24.970344 36.349609 25.565344 36.599609 26.152344 C 36.859609 26.721344 37.319219 27.289234 37.949219 27.615234 C 38.569219 27.950234 39.270391 28.045047 39.900391 27.998047 C 40.280391 27.961047 40.65 27.895203 41 27.783203 L 41 26.759766 C 40.11 26.899766 39.229922 26.899578 38.669922 26.517578 C 38.039922 26.126578 37.74 25.288766 37.75 24.384766 C 37.73 23.564766 38.130547 22.782203 38.810547 22.408203 C 39.450547 22.063203 40.28 22.203266 41 22.697266 L 41 21.466797 C 40.77 21.327797 40.529766 21.216812 40.259766 21.132812 C 39.934766 21.034813 39.579609 20.993797 39.224609 21.013672 z M 29.705078 21.025391 C 29.44075 21.049125 29.177172 21.100391 28.919922 21.181641 C 28.036922 21.459641 27.405359 22.055063 27.318359 22.664062 C 27.156359 23.803062 27.990391 24.470297 28.400391 24.654297 C 28.810391 24.876297 29.179531 24.973312 29.519531 25.070312 C 30.209531 25.235312 30.647641 25.421969 30.806641 25.667969 C 30.893641 25.802969 30.929688 25.905938 30.929688 26.085938 C 30.929687 26.265938 30.889219 26.426969 30.699219 26.542969 C 30.309219 26.755969 29.639297 26.833625 29.029297 26.765625 C 28.419297 26.707625 27.64 26.436781 27 26.175781 L 27 27.25 C 27.59 27.617 28.219141 27.811734 28.869141 27.927734 C 29.639141 28.033734 30.430312 28.101844 31.320312 27.714844 C 31.750313 27.540844 32.271484 27.15175 32.271484 26.09375 C 32.271484 24.98975 31.470312 24.504547 31.070312 24.310547 C 30.670312 24.107547 30.300937 24.010297 29.960938 23.904297 C 29.630938 23.797297 28.759766 23.655297 28.759766 22.904297 C 28.759766 22.591297 29.089844 22.416844 29.339844 22.339844 C 30.179844 22.059844 31.17 22.275172 32 22.701172 L 32 21.462891 C 31.3025 21.128391 30.498062 20.954187 29.705078 21.025391 z M 39.603516 31.009766 C 38.492516 31.009766 37.173172 31.290234 36.201172 31.990234 C 35.923172 32.200234 35.922531 32.480469 36.269531 32.480469 C 37.380531 32.340469 39.881188 31.989141 40.367188 32.619141 C 40.784188 33.179141 39.881844 35.561641 39.464844 36.681641 C 39.325844 37.031641 39.604813 37.100625 39.882812 36.890625 C 41.757812 35.279625 42.244484 31.988359 41.896484 31.568359 C 41.688484 31.219359 40.714516 31.009766 39.603516 31.009766 z M 8.9628906 31.771484 C 8.9071406 31.782359 8.8549062 31.811875 8.8164062 31.859375 C 8.7294063 31.966375 8.7465156 32.125891 8.8535156 32.212891 C 10.913516 33.880891 13.244937 35.152578 15.710938 36.142578 C 18.184937 37.100578 20.808094 37.7575 23.496094 37.9375 C 26.185094 38.1225 28.887422 37.870031 31.482422 37.207031 C 34.079422 36.535031 36.553578 35.501641 38.767578 33.931641 C 38.960578 33.795641 39.035594 33.536453 38.933594 33.314453 C 38.817594 33.063453 38.520531 32.955312 38.269531 33.070312 L 38.230469 33.087891 C 35.965469 34.130891 33.502547 34.863188 31.060547 35.367188 C 28.608547 35.877187 26.096328 36.071375 23.611328 35.984375 C 21.120328 35.883375 18.645891 35.387313 16.212891 34.695312 C 13.798891 33.955313 11.393531 33.023641 9.1445312 31.806641 L 9.1289062 31.796875 C 9.0774063 31.768875 9.0186406 31.760609 8.9628906 31.771484 z"/></svg>
  )
}

function RSSIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 4h15A4.5 4.5 0 0 1 28 8.5v15a4.5 4.5 0 0 1-4.5 4.5h-15A4.5 4.5 0 0 1 4 23.5v-15A4.5 4.5 0 0 1 8.5 4ZM13 22a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-6-6a9 9 0 0 1 9 9h3A12 12 0 0 0 7 13v3Zm5.74-4.858A15 15 0 0 0 7 10V7a18 18 0 0 1 18 18h-3a15 15 0 0 0-9.26-13.858Z"
      />
    </svg>
  )
}

function PersonIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 11 12" {...props}>
      <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
    </svg>
  )
}

function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-black-300', 'fill-red-600']}
          className="h-2.5 w-2.5"
        />
        <span className="ml-2.5">About</span>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base leading-7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4'
        )}
      >
        Welcome to NPI Tech Guys, your go-to radio show for cutting-edge Managed IT Services! Are you tired of unresponsive, slow service from your current IT provider? Discover a world where network security, data protection, and expert support come together seamlessly. Stay tuned to learn how to transform your IT experience and never worry about downtime again! Call us at (801) 824-7820 and let`s make IT great together!
      </p>

      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-red-500 hover:text-red-700 active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}

export function Layout({ children }) {
  let hosts = ['Sam Bushman', 'Jay Hill', 'Various Guests']
  const subScript = `<div id="mc_embed_shell">
<link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
<style type="text/css">
  #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif;}
  /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
     We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="https://gmail.us9.list-manage.com/subscribe/post?u=fe390792b7a54704abc0853e3&amp;id=fb442338a2&amp;f_id=00b118e1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate " target="_blank">
  <div id="mc_embed_signup_scroll"><h2>Subscribe</h2><h3>Join our newsletter to get tech updates!</h3>
      <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
      <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value=""><span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span></div>
  <div id="mce-responses" class="clear">
      <div class="response" id="mce-error-response" style="display: none;"></div>
      <div class="response" id="mce-success-response" style="display: none;"></div>
  </div><div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_fe390792b7a54704abc0853e3_fb442338a2" tabindex="-1" value=""></div><div class="clear"><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe"></div>
</div>
</form>
</div>
<script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';}(jQuery));var $mcj = jQuery.noConflict(true);</script></div>`


  return (
    <>
      <header className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
        <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Hosted by</span>
          <span className="mt-6 flex gap-6 font-bold text-slate-900">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </span>
        </div>
        <div className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:py-12 lg:px-8 xl:px-12">
          <Link
            href="/"
            className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
          >
            <Image
              className="w-full p-5"
              src={posterImage}
              alt=""
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
              priority
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
          </Link>
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-xl font-bold text-slate-900">
              <Link href="/">NPI Tech Guys</Link>
            </p>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
            </p>
          </div>
          <AboutSection className="mt-12 hidden lg:block" />
          <section className="mt-10 lg:mt-12 mb-10">
            <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
              <TinyWaveFormIcon
                colors={['fill-red-600', 'fill-black-300']}
                className="h-2.5 w-2.5"
              />
              <span className="ml-2.5">Listen</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
            <ul
              role="list"
              className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {[
                ['Spotify', SpotifyIcon, ''],
                ['Apple Podcast', ApplePodcastIcon, 'https://podcasts.apple.com/us/podcast/npi-tech-guys/id1715151053'],
                ['Amazon Music', AmazonMusic, 'https://music.amazon.com/podcasts/c813f44c-d4b8-4cf3-b842-61679fdd70de/npi-tech-guys'],
                ['RSS Feed', RSSIcon, 'https://feeds.blubrry.com/feeds/1473047.xml'],
              ].map(([label, Icon, href]) => (
                <li key={label} className="flex">
                  <Link
                    target='_blank'
                    href={href}
                    className="group flex items-center"
                    aria-label={label}
                  >
                    <Icon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600" />
                    <span className="hidden sm:ml-3 sm:block">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <div className='hidden lg:inline' dangerouslySetInnerHTML={{ __html: subScript }} />
          <div className='mt-12 text-base leading-7 text-slate-700 hidden lg:inline'>© 2022-2023. NPI TECH GUYS. All Rights Reserved.
          </div>

        </div>
      </header>
      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
        <Waveform className="absolute left-0 top-0 h-20 w-full" />
        <div className="relative">{children}</div>
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-10 pb-10 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
            <PersonIcon className="h-3 w-auto fill-slate-300" />
            <span className="ml-2.5">Hosted by</span>
          </h2>
          <div className="mt-2 flex gap-6 text-sm font-bold leading-7 text-slate-900">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </div>
          <div className='mt-12 bottom' dangerouslySetInnerHTML={{ __html: subScript }} />
          <div className='mt-12 text-base leading-7 text-slate-700 bottom'>© 2022-2023. NPI TECH GUYS. All Rights Reserved.
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120">
        <AudioPlayer />
      </div>

    </>
  )
}
