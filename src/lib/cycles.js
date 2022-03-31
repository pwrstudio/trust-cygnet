import { writable, derived } from 'svelte/store';
import Cookies from 'js-cookie'
export const currentCycle = writable({})
export const availableCycles = writable([])
export const currentCyclePhaseName = derived(
    currentCycle,
    $currentCycle => {
        if (!$currentCycle) return ""
        if ($currentCycle.phase === 'proposal') return 'Proposal'
        if ($currentCycle.phase === 'vote') return 'Vote'
        if ($currentCycle.phase === 'result') return 'Results'
        return $currentCycle.phase
    }
);

export const setDefaultCycle = (user, cycles) => {
    if (!user.roles || !Array.isArray(user.roles)) return
    const defaultCycle = cycles.find(c => user.roles.includes(c.discordRole))
    if (!defaultCycle) {
        console.log('No cycle found')
        return
    }
    currentCycle.set(defaultCycle)
    setCycleToCookie(defaultCycle)
}

export const setAvailableCycles = (user, cycles) => {
    if (!user.roles || !Array.isArray(user.roles)) return
    availableCycles.set(cycles.filter(c => user.roles.includes(c.discordRole)))
}

export const changeCycle = (cycle) => {
    currentCycle.set(cycle)
    setCycleToCookie(cycle)
}

export const getCycleFromCookie = () => {
    const cycleCookie = Cookies.get('cygnetCycle')
    if (cycleCookie) return cycleCookie
    return null
}

export const setCycleToCookie = cycle => {
    if (cycle && cycle._id) {
        Cookies.set('cygnetCycle', cycle._id)
    }
}