import { Fragment, useEffect, useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Switch } from '@headlessui/react'
import { AudioPlayer } from '@/components/player/AudioPlayer'
import posterImage from '@/images/poster.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false)
  let { pathname } = useRouter();
  let router = useRouter();
  useEffect(() => {
    if (pathname === '/news' && enabled === false) {
      setEnabled(true);
    } else if (pathname === '/') {
      setEnabled(false)
    }
  }, [pathname]);
  function handleClick() {
    if (pathname === '/') {
      router.push("/news");
    } else {
      router.push("/");
    }
  }



  return (
    <>
      <div className='flex justify-center lg:justify-start mt-5'>
        {enabled === false && (
          <h3 className='mr-3 font-bold'>Podcasts</h3>
        )}
        {enabled && (
          <h3 className='mr-3'>Podcasts</h3>
        )}
        <Switch
          checked={enabled}
          onClick={handleClick}
          onChange={setEnabled}
          className={classNames(
            enabled ? 'bg-[#662B33]' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#662B33] focus:ring-offset-2'
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
        {enabled && (
          <h3 className='ml-3 font-bold'>News</h3>
        )}
        {enabled === false && (
          <h3 className='ml-3'>News</h3>
        )}
      </div>
    </>
  )
}
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

function AmazonMusicIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px" {...props}><path d="M 14 4 C 8.4886661 4 4 8.4886661 4 14 L 4 36 C 4 41.511334 8.4886661 46 14 46 L 36 46 C 41.511334 46 46 41.511334 46 36 L 46 14 C 46 8.4886661 41.511334 4 36 4 L 14 4 z M 14 6 L 36 6 C 40.430666 6 44 9.5693339 44 14 L 44 36 C 44 40.430666 40.430666 44 36 44 L 14 44 C 9.5693339 44 6 40.430666 6 36 L 6 14 C 6 9.5693339 9.5693339 6 14 6 z M 34 18.009766 A 1 1 0 0 0 34 20.009766 A 1 1 0 0 0 34 18.009766 z M 9.25 21.009766 L 9.25 28.009766 L 10.75 28.009766 L 10.75 22.869141 C 11.242668 22.749795 11.737199 22.63579 12.226562 22.505859 C 12.726563 22.369859 13.202141 22.740016 13.244141 23.166016 L 13.251953 28.009766 L 14.751953 28.009766 L 14.753906 25.509766 L 14.759766 24.259766 L 14.753906 23.634766 L 14.75 23.318359 C 14.741534 23.172558 14.723729 23.027965 14.689453 22.884766 C 15.202471 22.760846 15.717076 22.641132 16.226562 22.505859 C 16.726562 22.368859 17.202141 22.741016 17.244141 23.166016 L 17.251953 28.009766 L 18.751953 28.009766 L 18.753906 25.509766 L 18.759766 24.259766 L 18.753906 23.634766 L 18.75 23.318359 C 18.741 23.163359 18.724547 23.009422 18.685547 22.857422 C 18.538547 22.248422 18.123797 21.725453 17.591797 21.439453 C 17.064797 21.146453 16.394375 21.108828 15.859375 21.298828 C 15.293468 21.491767 14.731792 21.700512 14.169922 21.908203 C 14.00164 21.721438 13.810124 21.556824 13.591797 21.439453 C 13.064797 21.146453 12.394375 21.108828 11.859375 21.298828 C 11.487747 21.42553 11.119723 21.565445 10.75 21.699219 L 10.75 21.009766 L 9.25 21.009766 z M 21.75 21.009766 L 20.251953 21.011719 L 20.253906 23.431641 C 20.244906 24.254641 20.236672 25.008672 20.263672 25.888672 C 20.306672 26.502672 20.640031 27.061969 21.082031 27.417969 C 21.527031 27.778969 22.073234 27.968906 22.615234 28.003906 C 23.137234 28.046906 23.749859 27.888156 24.130859 27.660156 C 24.171208 27.639321 24.209897 27.615122 24.25 27.59375 L 24.25 27.828125 L 25.75 27.828125 L 25.75 21.011719 L 24.25 21.011719 L 24.25 26.365234 C 24.038477 26.438556 23.825083 26.508305 23.617188 26.589844 C 23.265187 26.738844 23.038422 26.764469 22.732422 26.730469 C 22.158422 26.660469 21.720859 26.2035 21.755859 25.8125 C 21.764859 25.0805 21.767906 24.219687 21.753906 23.429688 L 21.75 21.009766 z M 33.25 21.009766 L 33.25 28.009766 L 34.75 28.009766 L 34.75 21.009766 L 33.25 21.009766 z M 39.224609 21.013672 C 38.869609 21.033547 38.514453 21.114406 38.189453 21.253906 C 36.869453 21.831906 36.22 23.191344 36.25 24.402344 C 36.26 24.970344 36.349609 25.565344 36.599609 26.152344 C 36.859609 26.721344 37.319219 27.289234 37.949219 27.615234 C 38.569219 27.950234 39.270391 28.045047 39.900391 27.998047 C 40.280391 27.961047 40.65 27.895203 41 27.783203 L 41 26.759766 C 40.11 26.899766 39.229922 26.899578 38.669922 26.517578 C 38.039922 26.126578 37.74 25.288766 37.75 24.384766 C 37.73 23.564766 38.130547 22.782203 38.810547 22.408203 C 39.450547 22.063203 40.28 22.203266 41 22.697266 L 41 21.466797 C 40.77 21.327797 40.529766 21.216812 40.259766 21.132812 C 39.934766 21.034813 39.579609 20.993797 39.224609 21.013672 z M 29.705078 21.025391 C 29.44075 21.049125 29.177172 21.100391 28.919922 21.181641 C 28.036922 21.459641 27.405359 22.055063 27.318359 22.664062 C 27.156359 23.803062 27.990391 24.470297 28.400391 24.654297 C 28.810391 24.876297 29.179531 24.973312 29.519531 25.070312 C 30.209531 25.235312 30.647641 25.421969 30.806641 25.667969 C 30.893641 25.802969 30.929688 25.905938 30.929688 26.085938 C 30.929687 26.265938 30.889219 26.426969 30.699219 26.542969 C 30.309219 26.755969 29.639297 26.833625 29.029297 26.765625 C 28.419297 26.707625 27.64 26.436781 27 26.175781 L 27 27.25 C 27.59 27.617 28.219141 27.811734 28.869141 27.927734 C 29.639141 28.033734 30.430312 28.101844 31.320312 27.714844 C 31.750313 27.540844 32.271484 27.15175 32.271484 26.09375 C 32.271484 24.98975 31.470312 24.504547 31.070312 24.310547 C 30.670312 24.107547 30.300937 24.010297 29.960938 23.904297 C 29.630938 23.797297 28.759766 23.655297 28.759766 22.904297 C 28.759766 22.591297 29.089844 22.416844 29.339844 22.339844 C 30.179844 22.059844 31.17 22.275172 32 22.701172 L 32 21.462891 C 31.3025 21.128391 30.498062 20.954187 29.705078 21.025391 z M 39.603516 31.009766 C 38.492516 31.009766 37.173172 31.290234 36.201172 31.990234 C 35.923172 32.200234 35.922531 32.480469 36.269531 32.480469 C 37.380531 32.340469 39.881188 31.989141 40.367188 32.619141 C 40.784188 33.179141 39.881844 35.561641 39.464844 36.681641 C 39.325844 37.031641 39.604813 37.100625 39.882812 36.890625 C 41.757812 35.279625 42.244484 31.988359 41.896484 31.568359 C 41.688484 31.219359 40.714516 31.009766 39.603516 31.009766 z M 8.9628906 31.771484 C 8.9071406 31.782359 8.8549062 31.811875 8.8164062 31.859375 C 8.7294063 31.966375 8.7465156 32.125891 8.8535156 32.212891 C 10.913516 33.880891 13.244937 35.152578 15.710938 36.142578 C 18.184937 37.100578 20.808094 37.7575 23.496094 37.9375 C 26.185094 38.1225 28.887422 37.870031 31.482422 37.207031 C 34.079422 36.535031 36.553578 35.501641 38.767578 33.931641 C 38.960578 33.795641 39.035594 33.536453 38.933594 33.314453 C 38.817594 33.063453 38.520531 32.955312 38.269531 33.070312 L 38.230469 33.087891 C 35.965469 34.130891 33.502547 34.863188 31.060547 35.367188 C 28.608547 35.877187 26.096328 36.071375 23.611328 35.984375 C 21.120328 35.883375 18.645891 35.387313 16.212891 34.695312 C 13.798891 33.955313 11.393531 33.023641 9.1445312 31.806641 L 9.1289062 31.796875 C 9.0774063 31.768875 9.0186406 31.760609 8.9628906 31.771484 z" /></svg>
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
function PandoraIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 50 50" width="32px" height="32px"><path d="M 10 6 A 1.0001 1.0001 0 0 0 9 7 L 9 43 A 1.0001 1.0001 0 0 0 10 44 L 18 44 C 19.64497 44 21 42.64497 21 41 L 21 35 L 27.119141 35 C 34.900453 35 41.616549 29.008537 41.984375 21.199219 C 42.375518 12.890922 35.728135 6 27.5 6 L 10 6 z M 11 8 L 27.5 8 C 34.615865 8 40.325186 13.907765 39.986328 21.105469 C 39.670154 27.81815 33.875828 33 27.119141 33 L 20 33 A 1.0001 1.0001 0 0 0 19 34 L 19 41 C 19 41.56503 18.56503 42 18 42 L 11 42 L 11 8 z" /></svg>
  )
}
function iHeartIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 100 100" width="32px" height="32px"><path d="M 30.810547 18 C 23.768547 18 18 23.768547 18 30.810547 L 18 69.189453 C 18 76.230453 23.768547 82 30.810547 82 L 69.189453 82 C 76.230453 82 82 76.231453 82 69.189453 L 82 30.810547 C 82 23.768547 76.231453 18 69.189453 18 L 30.810547 18 z M 30.810547 20 L 69.189453 20 C 75.139453 20 80 24.859547 80 30.810547 L 80 69.189453 C 80 75.139453 75.140453 80 69.189453 80 L 30.810547 80 C 24.859547 80 20 75.140453 20 69.189453 L 20 30.810547 C 20 24.859547 24.859547 20 30.810547 20 z M 31.5 23 C 26.812 23 23 26.812 23 31.5 L 23 49.574219 C 22.996 49.850219 23.216188 50.076078 23.492188 50.080078 C 23.768187 50.084078 23.996 49.863891 24 49.587891 L 24 49.574219 L 24 31.5 C 24 27.352 27.352 24 31.5 24 L 40.056641 24 C 40.332641 24.004 40.560453 23.783812 40.564453 23.507812 C 40.568453 23.231813 40.346313 23.004 40.070312 23 L 40.056641 23 L 31.5 23 z M 43.056641 23 C 42.780641 22.996 42.554781 23.216188 42.550781 23.492188 C 42.546781 23.768187 42.766969 23.996 43.042969 24 L 43.056641 24 L 50.019531 24 C 50.295531 24.004 50.523344 23.783812 50.527344 23.507812 C 50.531344 23.231813 50.309203 23.004 50.033203 23 L 50.019531 23 L 43.056641 23 z M 53.019531 23 C 52.743531 22.996 52.517672 23.216188 52.513672 23.492188 C 52.509672 23.768187 52.729859 23.996 53.005859 24 L 53.019531 24 L 68.5 24 C 72.627 24 76 27.373 76 31.5 L 76 68.5 C 76 72.648 72.648 76 68.5 76 L 31.5 76 C 27.352 76 24 72.648 24 68.5 L 24 64.574219 C 24.004 64.298219 23.783812 64.070406 23.507812 64.066406 C 23.231813 64.062406 23.004 64.284547 23 64.560547 L 23 64.574219 L 23 68.5 C 23 73.188 26.812 77 31.5 77 L 68.5 77 C 73.188 77 77 73.188 77 68.5 L 77 31.5 C 77 26.827 73.173 23 68.5 23 L 53.019531 23 z M 40.005859 32 C 39.397816 31.999322 38.779287 32.040684 38.154297 32.126953 C 30.738794 33.150032 25.750535 40.479413 27.273438 47.800781 C 27.963113 51.118735 29.962222 53.669253 33.146484 56.853516 A 0.50005 0.50005 0 0 0 33.15625 56.863281 L 45.15625 68.183594 A 0.50005 0.50005 0 0 0 46 67.820312 L 46 57 C 46 54.785288 47.785288 53 50 53 C 52.214712 53 54 54.785288 54 57 L 54 67.820312 A 0.50005 0.50005 0 0 0 54.84375 68.183594 L 66.84375 56.863281 A 0.50005 0.50005 0 0 0 66.853516 56.853516 C 70.037778 53.669253 72.036888 51.118735 72.726562 47.800781 C 74.248397 40.480461 69.261258 33.150039 61.845703 32.126953 C 57.05789 31.466394 52.738374 33.473032 50 36.808594 C 47.976052 34.34399 45.109912 32.586556 41.796875 32.125 C 41.21146 32.043443 40.613902 32.000678 40.005859 32 z M 40.005859 33 C 40.568918 32.999752 41.123009 33.038187 41.664062 33.113281 C 44.910381 33.563969 47.722859 35.318939 49.599609 37.820312 A 0.50005 0.50005 0 0 0 50.400391 37.820312 C 52.901699 34.485234 57.069865 32.479096 61.708984 33.119141 C 68.54343 34.062054 73.154178 40.834012 71.748047 47.597656 C 71.115722 50.639703 69.290222 53.002747 66.146484 56.146484 L 55 66.660156 L 55 57 C 55 54.244712 52.755288 52 50 52 C 47.244712 52 45 54.244712 45 57 L 45 66.660156 L 33.853516 56.146484 L 33.851562 56.142578 L 33.84375 56.136719 C 30.706981 52.998652 28.883515 50.636033 28.251953 47.597656 C 26.844856 40.833024 31.456519 34.062061 38.291016 33.119141 C 38.870775 33.039136 39.442801 33.000248 40.005859 33 z M 62.972656 35.865234 A 0.50005 0.50005 0 0 0 62.685547 36.78125 C 65.294904 38.581135 67 41.586667 67 45 C 67 48.413333 65.294904 51.418865 62.685547 53.21875 A 0.50005 0.50005 0 1 0 63.253906 54.041016 C 66.124549 52.060901 68 48.746667 68 45 C 68 41.253333 66.124549 37.939099 63.253906 35.958984 A 0.50005 0.50005 0 0 0 62.972656 35.865234 z M 37.011719 35.867188 A 0.50005 0.50005 0 0 0 36.746094 35.958984 C 33.875451 37.939049 32 41.253333 32 45 C 32 48.746667 33.875451 52.060901 36.746094 54.041016 A 0.50005 0.50005 0 1 0 37.314453 53.21875 C 34.705096 51.418865 33 48.413333 33 45 C 33 41.586667 34.705096 38.581135 37.314453 36.78125 A 0.50005 0.50005 0 0 0 37.011719 35.867188 z M 43.318359 38.255859 A 0.50005 0.50005 0 0 0 43.091797 38.314453 C 40.659228 39.557486 39 42.090049 39 45 C 39 47.909951 40.659228 50.442472 43.091797 51.685547 A 0.50007721 0.50007721 0 1 0 43.546875 50.794922 C 41.439444 49.717997 40 47.530049 40 45 C 40 42.469951 41.439444 40.282003 43.546875 39.205078 A 0.50005 0.50005 0 0 0 43.318359 38.255859 z M 56.666016 38.255859 A 0.50005 0.50005 0 0 0 56.453125 39.205078 C 58.560556 40.281957 60 42.469951 60 45 C 60 47.530049 58.560556 49.717997 56.453125 50.794922 A 0.50007721 0.50007721 0 1 0 56.908203 51.685547 C 59.340772 50.442472 61 47.909951 61 45 C 61 42.090049 59.340772 39.557528 56.908203 38.314453 A 0.50005 0.50005 0 0 0 56.666016 38.255859 z M 50 41 C 48.708334 41 47.676923 41.502378 47.001953 42.261719 C 46.326984 43.02106 46 44.013889 46 45 C 46 45.986111 46.326984 46.97894 47.001953 47.738281 C 47.676923 48.497622 48.708334 49 50 49 C 51.291666 49 52.323077 48.497622 52.998047 47.738281 C 53.673016 46.97894 54 45.986111 54 45 C 54 44.013889 53.673016 43.02106 52.998047 42.261719 C 52.323077 41.502378 51.291666 41 50 41 z M 50 42 C 51.041666 42 51.760256 42.372622 52.251953 42.925781 C 52.74365 43.47894 53 44.236111 53 45 C 53 45.763889 52.74365 46.52106 52.251953 47.074219 C 51.760256 47.627378 51.041666 48 50 48 C 48.958334 48 48.239744 47.627378 47.748047 47.074219 C 47.25635 46.52106 47 45.763889 47 45 C 47 44.236111 47.25635 43.47894 47.748047 42.925781 C 48.239744 42.372622 48.958334 42 50 42 z M 23.492188 58.066406 C 23.216188 58.070406 22.996 58.298219 23 58.574219 L 23 61.574219 C 22.996 61.850219 23.216188 62.076078 23.492188 62.080078 C 23.768187 62.084078 23.996 61.863891 24 61.587891 L 24 61.574219 L 24 58.574219 C 24.004 58.298219 23.783812 58.071406 23.507812 58.066406 L 23.492188 58.066406 z" /></svg>
  )
}
function MailIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} version="1.1" width="28px" height="28px" viewBox="0 0 256 256">
      <defs>
      </defs>
      <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
        <path d="M 75.546 78.738 H 14.455 C 6.484 78.738 0 72.254 0 64.283 V 25.716 c 0 -7.97 6.485 -14.455 14.455 -14.455 h 61.091 c 7.97 0 14.454 6.485 14.454 14.455 v 38.567 C 90 72.254 83.516 78.738 75.546 78.738 z M 14.455 15.488 c -5.64 0 -10.228 4.588 -10.228 10.228 v 38.567 c 0 5.64 4.588 10.229 10.228 10.229 h 61.091 c 5.64 0 10.228 -4.589 10.228 -10.229 V 25.716 c 0 -5.64 -4.588 -10.228 -10.228 -10.228 H 14.455 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        <path d="M 11.044 25.917 C 21.848 36.445 32.652 46.972 43.456 57.5 c 2.014 1.962 5.105 -1.122 3.088 -3.088 C 35.74 43.885 24.936 33.357 14.132 22.83 C 12.118 20.867 9.027 23.952 11.044 25.917 L 11.044 25.917 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        <path d="M 46.544 57.5 c 10.804 -10.527 21.608 -21.055 32.412 -31.582 c 2.016 -1.965 -1.073 -5.051 -3.088 -3.088 C 65.064 33.357 54.26 43.885 43.456 54.412 C 41.44 56.377 44.529 59.463 46.544 57.5 L 46.544 57.5 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        <path d="M 78.837 64.952 c -7.189 -6.818 -14.379 -13.635 -21.568 -20.453 c -2.039 -1.933 -5.132 1.149 -3.088 3.088 c 7.189 6.818 14.379 13.635 21.568 20.453 C 77.788 69.973 80.881 66.89 78.837 64.952 L 78.837 64.952 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        <path d="M 14.446 68.039 c 7.189 -6.818 14.379 -13.635 21.568 -20.453 c 2.043 -1.938 -1.048 -5.022 -3.088 -3.088 c -7.189 6.818 -14.379 13.635 -21.568 20.453 C 9.315 66.889 12.406 69.974 14.446 68.039 L 14.446 68.039 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
      </g>
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
          colors={['fill-black-300', 'fill-[#662B33]']}
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
        Welcome to NPI Tech Guys, your go-to radio show for cutting-edge Managed IT Services! Are you tired of unresponsive, slow service from your current IT provider? Discover a world where network security, data protection, and expert support come together seamlessly. Stay tuned to learn how to transform your IT experience and never worry about downtime again! Call us at (801) 706-6980 and let`s make IT great together!
        <br />
        <br />
        <br />
        HOST: Sam Bushman
        <br />
        Sam is a co-founder of TechWatch Radio and a well known consultant, specializing in radio automation, digital audio production & editing, voice-over work, remote control access, networking, Internet streaming, etc. Sam is available as an IT consultant.
        <br />
        <br />
        CO-HOST: Jay Harrison
        <br />
        Jay has 30+ years of computer experience, as a co-founder of TechWatch Radio, he brings his knowledge & opinions on current tech news and advice to anyone with computer or technology problems. Jay currently serves as a full-time IT Administrator in the corporate world.

      </p>

      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-[#662B33] hover:text-[#662B34] active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}

export function Layout({ children }) {
  let hosts = ['Sam Bushman', 'Jay Harrison', 'Various Guests']

  const today = new Date();
  const year = today.getFullYear();
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
            <ToggleSwitch />
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
              className="mt-4 flex flex-wrap justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {[
                ['Spotify', SpotifyIcon, 'https://open.spotify.com/show/3fNctAnApk4GaEsYEFo6DB'],
                ['Apple Podcast', ApplePodcastIcon, 'https://podcasts.apple.com/us/podcast/npi-tech-guys/id1715151053'],
                ['Amazon Music', AmazonMusicIcon, 'https://music.amazon.com/podcasts/c813f44c-d4b8-4cf3-b842-61679fdd70de/npi-tech-guys'],
                ['Pandora', PandoraIcon, 'https://www.pandora.com/podcast/npi-tech-guys/PC:1001081584'],
                ['iHeart Radio', iHeartIcon, 'https://iheart.com/podcast/129727764/'],
                ['RSS Feed', RSSIcon, 'https://feeds.blubrry.com/feeds/1473047.xml'],
                ['Email', MailIcon, 'https://www.subscribebyemail.com/feeds.blubrry.com/feeds/1473047.xml'],
              ].map(([label, Icon, href]) => (
                <li key={label} className="flex">
                  <Link
                    target='_blank'
                    rel="noreferrer"
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
          <div className="py-5 rounded-lg hidden lg:inline-block">
            <h1 className="text-xl font-bold text-slate-900 mb-4">Join our weekly mailing list!</h1>


            <Link href='https://www.networkprovidersinc.com/drip-tips/' target='_blank' className="bg-[#662B33] text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue active:bg-red-800">
              Join now
            </Link>
          </div>
          <div className='mt-12 text-base leading-7 text-slate-700 hidden lg:inline-block'>© 2022-{year}. NPI TECH GUYS. All Rights Reserved.
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
          <div className=" pt-16 rounded-lg">
            <h1 className="text-xl font-bold text-slate-900 mb-4">Join our weekly mailing list!</h1>


            <Link href='https://www.networkprovidersinc.com/drip-tips/' target='_blank' className="bg-[#662B33] text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue active:bg-red-800">
              Join now
            </Link>
          </div>
          <div className='mt-12 text-base leading-7 text-slate-700 bottom'>© 2022-{year}. NPI TECH GUYS. All Rights Reserved.
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120">
        <AudioPlayer />
      </div>

    </>
  )
}
