import { getTime, updateTime } from '@/api/setting/config'
import { defineStore } from 'pinia'
interface TimeSate {
    timeZoneAll: any,
    timeZoomText: String,
    timeZoom: String,
    timeZoomI: number
}

const useTimeStore = defineStore({
    id: 'time',
    state: (): TimeSate => {
        return {
            timeZoneAll: [
                { id: 1, label: '中国上海', value: 'Asia/Shanghai', zoomi: 8 },
                { id: 2, label: '印度尼西亚', value: 'Asia/Jakarta', zoomi: 7 },
                { id: 3, label: '越南', value: 'Asia/Ho_Chi_Minh', zoomi: 7 },
                { id: 4, label: '泰国', value: 'Asia/Bangkok', zoomi: 7 },
                { id: 5, label: '日本', value: 'Asia/Tokyo', zoomi: 9 },
                { id: 6, label: '墨西哥', value: 'America/Mexico_City', zoomi: -6 },
                { id: 7, label: '美国东部', value: 'America/Detroit', zoomi: -5 },
                { id: 30, label: '太平洋时区', value: 'America/Pacific', zoomi: -7 },
                { id: 8, label: '哥伦比亚', value: 'America/Colombia', zoomi: -5 },
                { id: 9, label: '古巴', value: 'America/Cuba', zoomi: -5 },
                { id: 10, label: '秘鲁', value: 'America/Peru', zoomi: -5 },
                { id: 11, label: '智利', value: 'America/Detroit', zoomi: -4 },
                { id: 12, label: '委内瑞拉', value: 'America/Venezuela', zoomi: -4 },
                { id: 13, label: '巴西', value: 'America/Sao_Paulo', zoomi: -3 },
                { id: 14, label: '阿根廷', value: 'America/Argentina', zoomi: -3 },
                { id: 15, label: '乌拉圭', value: 'America/Uruguay', zoomi: -3 },
                { id: 30, label: '苏里南', value: 'America/Suriname', zoomi: -3 },
                { id: 16, label: '巴拉圭', value: 'America/Paraguay', zoomi: -4 },
                { id: 17, label: '加拿大', value: 'America/Toronto', zoomi: -4 },
                { id: 18, label: '英国', value: 'Europe/London', zoomi: 0},
                { id: 19, label: '葡萄牙', value: 'Europe/Portuguese', zoomi: 0 },
                { id: 20, label: '西班牙', value: 'Europe/Madrid', zoomi: 1 },
                { id: 21, label: '波兰', value: 'Europe/Warsaw', zoomi: 1 },
                { id: 22, label: '荷兰', value: 'Europe/Netherlands', zoomi: 1 },
                { id: 23, label: '瑞士', value: 'Europe/Swiss', zoomi: 1 },
                { id: 24, label: '意大利', value: 'Europe/Rome', zoomi: 1 },
                { id: 25, label: '德国', value: 'Europe/Berlin', zoomi: 1 },
                { id: 26, label: '法国', value: 'Europe/French', zoomi: 1 },
                { id: 27, label: '土耳其', value: 'Europe/Istanbul', zoomi: 3 },
                { id: 28, label: '俄罗斯', value: 'Europe/Moscow', zoomi: 3 },
                { id: 29, label: '澳大利亚', value: 'Australia/Sydney', zoomi: 9 }
            ],
            timeZoomText: '',
            timeZoom: '',
            timeZoomI: 0
        }
    },
    actions: {
        getTimeZoom() {
            return new Promise((resolve, reject) => {
                getTime().then(res => {
                        this.timeZoom = res.setTimeZone
                        //@ts-ignore
                        const item = this.timeZoneAll.find(item1 => {
                            return item1.value === res.setTimeZone
                        })
                        this.timeZoomText = item.label
                        this.timeZoomI = item.zoomi
                        resolve(res.setTimeZone)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        setTimeZoom(timeRes: String) {
            return new Promise((resolve, reject) => {
                updateTime({ setTimeZone: timeRes }).then(res => {
                    this.timeZoom = timeRes
                    //@ts-ignore
                    const item = this.timeZoneAll.find(item1 => {
                        return item1.value === timeRes
                    })
                    this.timeZoomText = item.label
                    this.timeZoomI = item.zoomi
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
})

export default useTimeStore
